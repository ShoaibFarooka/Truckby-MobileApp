import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Image } from 'expo-image';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import { Toast } from 'toastify-react-native';
import { showApiError } from '../../../utils/apiError';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '../../../redux/userSlice';
import { hideLoader, showLoader } from '../../../redux/loaderSlice';
import userService from '../../../services/userService';
import useImageUpload from '../../../hooks/useImageUpload';
import subscriptionService from '../../../services/subscriptionService';
import { styles } from './ProfileStyles';


function ToggleSwitch({ checked, onChange }) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onChange}
            style={[styles.toggleTrack, checked ? styles.toggleTrackOn : styles.toggleTrackOff]}
        >
            <View style={[styles.toggleThumb, checked ? styles.toggleThumbOn : styles.toggleThumbOff]} />
        </TouchableOpacity>
    );
}


export default function SellerProfile() {
    const dispatch = useDispatch();
    const authUser = useSelector((state) => state.auth.user);

    const [formData, setFormData] = useState({
        name: '',
        userName: '',
        email: '',
        gender: '',
        country: '',
        state: '',
        city: '',
        phone: '',
        companyName: '',
        image: '',
    });

    const { prepare: prepareImage, clear: clearImage, upload: uploadImage } = useImageUpload();
    // Start with the photo already in Redux (the Header has it cached) instead of waiting for the fetch
    const [previewUrl, setPreviewUrl] = useState(authUser?.image || null);
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState({ status: false, planName: '' });
    const [autoRenew, setAutoRenew] = useState(false);


    useEffect(() => {
        const loadUser = async () => {
            dispatch(showLoader());
            try {
                const res = await userService.getUserInfo();
                const user = res?.user || res; // handle both { user: {...} } and flat response
                setFormData({
                    name: user?.name || '',
                    userName: user?.userName || '',
                    email: user?.email || '',
                    gender: user?.gender || '',
                    country: user?.country || '',
                    state: user?.state || '',
                    city: user?.city || '',
                    phone: user?.phone ? String(user.phone) : '',
                    companyName: user?.companyName || '',
                    image: user?.image || '',
                });
                if (user?.image) setPreviewUrl(user.image);
            } catch (error) {
                showApiError(error, 'Failed to load profile');
            } finally {
                dispatch(hideLoader());
                setLoading(false);
            }
        };

        const loadSubscription = async () => {
            try {
                const response = await subscriptionService.getUserSubscriptionInfo();
                if (response.info) {
                    setInfo(response.info);
                    setAutoRenew(response.info.autoRenew ?? false);
                }
            } catch (error) {
                showApiError(error, 'Failed to load subscription');
            }
        };

        loadUser();
        loadSubscription();
    }, []);


    const handleChange = (name, value) =>
        setFormData((prev) => ({ ...prev, [name]: value }));

    const pickImage = async () => {
        // No permission request and no crop step: the system photo picker needs no
        // permission, and allowsEditing forces the slow legacy picker on iOS. The
        // avatar crops the photo to its frame with "cover".
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 0.8,
        });
        if (result.canceled || !result.assets?.length) return;
        const asset = result.assets[0];
        setPreviewUrl(asset.uri);
        // Shrink it now on the device; it is only uploaded on save
        prepareImage(asset);
    };

    const handleAutoRenewToggle = async () => {
        try {
            dispatch(showLoader());
            await subscriptionService.ToggleAutoRenew();
            setAutoRenew((prev) => !prev);
            Toast.success('Auto Renew status updated');
        } catch (error) {
            showApiError(error, 'Failed to update Auto Renew');
        } finally {
            dispatch(hideLoader());
        }
    };


    const handleSubmit = async () => {
        let finalData = { ...formData };

        dispatch(showLoader());
        try {
            // Uploads the already-shrunk photo; null when no new photo was picked
            const imageUrl = await uploadImage();
            if (imageUrl) {
                finalData.image = imageUrl;
                // Start downloading the new photo now so the Header shows it as soon as the profile saves
                Image.prefetch(imageUrl, 'memory-disk').catch(() => {});
            }
        } catch (error) {
            showApiError(error, 'Error uploading image');
            dispatch(hideLoader());
            return;
        }

        try {
            const response = await userService.updateUserInfo(finalData);
            if (!response) {
                Toast.error('Update failed');
                return;
            }
            Toast.success('Profile updated successfully');
            // The photo is saved now; don't upload it again on the next save
            clearImage();
            setFormData(finalData);
            dispatch(fetchUserInfo());
        } catch (error) {
            showApiError(error, 'Update failed');
        } finally {
            dispatch(hideLoader());
        }
    };



    if (loading) return null;

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                <View style={styles.card}>
                    <Text style={styles.title}>My Profile</Text>

                    {/* Avatar + subscription badge */}
                    <View style={styles.avatarSubscriptionRow}>
                        <View style={styles.avatarRow}>
                            <TouchableOpacity style={styles.avatarWrapper} onPress={pickImage} activeOpacity={0.8}>
                                {previewUrl ? (
                                    <Image
                                        source={{ uri: previewUrl }}
                                        style={styles.avatarImage}
                                        contentFit="cover"
                                        cachePolicy="memory-disk"
                                        transition={150}
                                    />
                                ) : (
                                    <View style={styles.avatarPlaceholder}>
                                        <Text style={styles.avatarPlaceholderText}>No Image</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                            <Text style={styles.avatarHint}>Tap photo to change</Text>
                        </View>

                        {info.status && (
                            <View>
                                <View style={styles.planBadge}>
                                    <Text style={styles.planBadgeLabel}>Active Plan</Text>
                                    <Text style={styles.planBadgeName}>{info.planName}</Text>
                                </View>
                                <View style={styles.autoRenewRow}>
                                    <Text style={styles.autoRenewLabel}>Auto Renew</Text>
                                    <ToggleSwitch checked={autoRenew} onChange={handleAutoRenewToggle} />
                                </View>
                            </View>
                        )}
                    </View>

                    {/* Full Name */}
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your full name"
                        placeholderTextColor="#767676"
                        value={formData.name}
                        onChangeText={(v) => handleChange('name', v)}
                    />

                    {/* Gender */}
                    <Text style={styles.label}>Gender</Text>
                    <Dropdown
                        style={styles.input}
                        placeholder="Select your gender"
                        placeholderStyle={{ color: '#767676' }}
                        iconStyle={{ marginRight: 16, width: 20, height: 20 }}
                        labelField="label"
                        valueField="value"
                        data={[
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' },
                            { label: 'Other', value: 'other' },
                        ]}
                        value={formData.gender}
                        onChange={(item) => handleChange('gender', item.value)}
                    />

                    {/* Country */}
                    <Text style={styles.label}>Country</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your country"
                        placeholderTextColor="#767676"
                        value={formData.country}
                        onChangeText={(v) => handleChange('country', v)}
                    />

                    {/* State */}
                    <Text style={styles.label}>State / Region</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your state or region"
                        placeholderTextColor="#767676"
                        value={formData.state}
                        onChangeText={(v) => handleChange('state', v)}
                    />

                    {/* City */}
                    <Text style={styles.label}>City</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your city"
                        placeholderTextColor="#767676"
                        value={formData.city}
                        onChangeText={(v) => handleChange('city', v)}
                    />

                    {/* Username */}
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your username"
                        placeholderTextColor="#767676"
                        value={formData.userName}
                        onChangeText={(v) => handleChange('userName', v)}
                        autoCapitalize="none"
                    />

                    {/* Phone */}
                    <Text style={styles.label}>Phone</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your phone number"
                        placeholderTextColor="#767676"
                        value={formData.phone}
                        onChangeText={(v) => handleChange('phone', v)}
                        keyboardType="phone-pad"
                    />

                    {/* Company Name */}
                    <Text style={styles.label}>Company Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your company name"
                        placeholderTextColor="#767676"
                        value={formData.companyName}
                        onChangeText={(v) => handleChange('companyName', v)}
                    />

                    {/* Save */}
                    <TouchableOpacity style={styles.saveButton} onPress={handleSubmit} activeOpacity={0.85}>
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}