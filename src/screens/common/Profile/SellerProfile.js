import React, { useEffect, useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '../../../redux/userSlice';
import { hideLoader, showLoader } from '../../../redux/loaderSlice';
import userService from '../../../services/userService';
import { uploadImg } from '../../../services/image';
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

    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
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
                Toast.show({ type: 'error', text1: error?.response?.data?.error || 'Failed to load profile' });
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
                Toast.show({ type: 'error', text1: error?.response?.data?.error || 'Failed to load subscription' });
            }
        };

        loadUser();
        loadSubscription();
    }, []);


    const handleChange = (name, value) =>
        setFormData((prev) => ({ ...prev, [name]: value }));

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Toast.show({ type: 'error', text1: 'Permission to access photos is required' });
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });
        if (result.canceled) return;
        const asset = result.assets[0];
        const ext = asset.uri.split('.').pop();
        setPreviewUrl(asset.uri);
        setImageFile({ uri: asset.uri, type: `image/${ext === 'jpg' ? 'jpeg' : ext}`, name: `profile.${ext}` });
    };

    const handleAutoRenewToggle = async () => {
        try {
            dispatch(showLoader());
            await subscriptionService.ToggleAutoRenew();
            setAutoRenew((prev) => !prev);
            Toast.show({ type: 'success', text1: 'Auto Renew status updated' });
        } catch {
            Toast.show({ type: 'error', text1: 'Failed to update Auto Renew' });
        } finally {
            dispatch(hideLoader());
        }
    };


    const handleSubmit = async () => {
        let finalData = { ...formData };

        if (imageFile) {
            dispatch(showLoader());
            try {
                const form = new FormData();
                form.append('images', imageFile);
                const res = await uploadImg(form);
                if (res?.success && res?.urls?.length > 0) {
                    finalData.image = res.urls[0];
                } else {
                    Toast.show({ type: 'error', text1: 'Image upload failed' });
                    return;
                }
            } catch {
                Toast.show({ type: 'error', text1: 'Error uploading image' });
                return;
            } finally {
                dispatch(hideLoader());
            }
        }

        try {
            dispatch(showLoader());
            const response = await userService.updateUserInfo(finalData);
            if (!response) {
                Toast.show({ type: 'error', text1: 'Update failed' });
                return;
            }
            Toast.show({ type: 'success', text1: 'Profile updated successfully' });
            dispatch(fetchUserInfo());
        } catch (error) {
            Toast.show({ type: 'error', text1: error?.response?.data?.error || 'Update failed' });
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
                                    <Image source={{ uri: previewUrl }} style={styles.avatarImage} />
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