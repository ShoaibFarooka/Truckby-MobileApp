import React, { useState } from 'react';
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
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '../../../redux/userSlice';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import userService from '../../../services/userService';
import { uploadImg } from '../../../services/image';
import { styles } from './ProfileStyles';

export default function UserProfile() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        userName: user?.userName || '',
        email: user?.email || '',
    });
    const [imageFile, setImageFile] = useState(null); // { uri, type, name }
    const [previewUrl, setPreviewUrl] = useState(user?.image || null);

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
        setImageFile({ uri: asset.uri, type: `image/${ext}`, name: `profile.${ext}` });
    };

    const handleSubmit = async () => {
        let updatedData = {
            userName: formData.userName,
            email: formData.email,
            image: user?.image || '',
        };

        if (imageFile) {
            dispatch(ShowLoading());
            try {
                const form = new FormData();
                form.append('images', imageFile);
                const res = await uploadImg(form);
                if (res?.success && res?.urls?.length > 0) {
                    updatedData.image = res.urls[0];
                } else {
                    Toast.show({ type: 'error', text1: 'Image upload failed' });
                    return;
                }
            } catch {
                Toast.show({ type: 'error', text1: 'Error uploading image' });
                return;
            } finally {
                dispatch(HideLoading());
            }
        }

        try {
            dispatch(ShowLoading());
            const response = await userService.updateUserInfo(updatedData);
            if (!response) {
                Toast.show({ type: 'error', text1: 'Update failed' });
                return;
            }
            Toast.show({ type: 'success', text1: 'Profile updated successfully' });
            dispatch(fetchUserInfo());
        } catch (error) {
            Toast.show({ type: 'error', text1: error?.response?.data?.error || 'Update failed' });
        } finally {
            dispatch(HideLoading());
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                <View style={styles.card}>
                    <Text style={styles.title}>My Profile</Text>

                    {/* Avatar */}
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

                    {/* Save */}
                    <TouchableOpacity style={styles.saveButton} onPress={handleSubmit} activeOpacity={0.85}>
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}