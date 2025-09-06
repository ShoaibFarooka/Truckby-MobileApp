import { View, Text, TextInput, Pressable, ActivityIndicator, Image, Alert, Linking } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import { styles } from "./FormStyles";
import { useNavigation } from '@react-navigation/native';
import Foundation from '@expo/vector-icons/Foundation';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { useState } from "react";
import { Toast } from 'toastify-react-native'
import * as yup from "yup";
import { countries } from "../../../../../data/countries";
import { states } from "../../../../../data/states";
import useForm from "../../../../../hooks/useForm";
import useApi from "../../../../../hooks/useApi";
import uploadService from "../../../../../services/uploadService";
import userService from "../../../../../services/userService";

const schema = yup.object().shape({
    fullName: yup.string().required('Full Name is required'),
    userName: yup.string().required('Username is required'),
    gender: yup.string().required('Gender is required'),
    country: yup.string().required('Country is required'),
    state: yup.string().when('country', {
        is: (val) => val === 'United States',
        then: (schema) => schema.required('State is required when country is United States'),
        otherwise: (schema) => schema.notRequired(),
    }),
    city: yup.string().required('City is required'),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, 'Password must be at least 6 characters').required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
    companyName: yup.string().required('Company Name is required'),
    phone: yup.string().matches(/^\d+$/, 'Phone must be a valid number').required('Phone is required')
});

const Form = () => {
    const initialValues = {
        fullName: '',
        userName: '',
        gender: '',
        country: '',
        state: '',
        city: '',
        email: '',
        password: '',
        confirmPassword: '',
        companyName: '',
        phone: ''
    };
    const form = useForm(initialValues, schema);
    const { execute, loading } = useApi(userService.registerUser);
    const { execute: uploadImage, loading: uploading } = useApi(uploadService.uploadImg)
    const [secure, setSecure] = useState(true);
    const [confirmSecure, setConfirmSecure] = useState(true);
    const [image, setImage] = useState(null);

    const navigation = useNavigation();

    const genders = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
    ];

    const handleImageUpload = async () => {
        // Ask for permission
        const { status, canAskAgain } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted' && canAskAgain) {
            Alert.alert('Permission to access media library is required!');
            return;
        } else if (status !== 'granted' && !canAskAgain) {
            Alert.alert(
                'Permission Required',
                'Media library access has been denied. Please enable it in settings to proceed.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Open Settings',
                        onPress: () => Linking.openSettings(),
                    },
                ]
            );
            return;
        }

        // Open image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1,
            allowsEditing: true,
            aspect: [1, 1], // makes it square
        });

        console.log("Upload: ", result.assets[0]);

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };

    const handleSubmit = async (values) => {
        let imageUrl = '';
        if (image && image.uri) {
            console.log("Started Uploading....");
            const imgForm = new FormData();

            const imageData = {
                uri: image.uri,
                name: image.fileName,
                type: image.mimeType
            };
            imgForm.append('images', imageData);
            try {
                const response = await uploadImage(imgForm);
                imageUrl = response?.urls[0] || "";
                console.log("Uploaded Image URL: ", imageUrl);
            } catch (error) {
                Toast.error(error);
                return;
            }
        }
        // return;

        const payload = {
            name: values.fullName,
            userName: values.userName,
            gender: values.gender,
            country: values.country,
            state: values.state,
            city: values.city,
            email: values.email,
            password: values.password,
            companyName: values.companyName,
            phone: Number(values.phone),
            image: imageUrl,
        };
        try {
            const response = await execute(payload, "seller");
            Toast.success(response.message);
            form.resetForm();
            navigation.replace("Login");
        } catch (error) {
            Toast.error(error);
        }
    };

    return (
        <View style={styles.container}>

            <View>
                <Pressable onPress={handleImageUpload} style={({ pressed }) => [styles.imageContainer, pressed && styles.buttonPressed]}>
                    {(image && image.uri) ? (
                        <Image source={{ uri: image.uri }} style={styles.image} />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Ionicons name="person-add" size={40} color="#999" />
                        </View>
                    )}
                </Pressable>
                {(image && image.uri) && (
                    <Pressable onPress={() => setImage(null)} style={({ pressed }) => [styles.clearButton, pressed && styles.buttonPressed]}>
                        <Ionicons name="close" size={16} color="white" />
                    </Pressable>
                )}
            </View>

            <View style={styles.inputContainer}>
                <View>
                    <Foundation name="torso" size={20} color="#9ca3af" style={[styles.icon, styles.leftIcon]} />
                    <TextInput
                        placeholder="Full Name"
                        style={styles.input}
                        placeholderTextColor="#9ca3af"
                        value={form.values.fullName}
                        onChangeText={(value) => form.onChange("fullName", value)}
                    />
                </View>
                {form.errors.fullName && <Text style={styles.inputError}>{form.errors.fullName}</Text>}
            </View>

            <View style={styles.inputContainer}>
                <View>
                    <Foundation name="mail" size={20} color="#9ca3af" style={[styles.icon, styles.leftIcon]} />
                    <TextInput
                        placeholder="Email"
                        keyboardType="email-address"
                        style={styles.input}
                        placeholderTextColor="#9ca3af"
                        value={form.values.email}
                        onChangeText={(value) => form.onChange("email", value)}
                    />
                </View>
                {form.errors.email && <Text style={styles.inputError}>{form.errors.email}</Text>}
            </View>

            <View style={styles.inputContainer}>
                <View>
                    <Feather name="at-sign" size={20} color="#9ca3af" style={[styles.icon, styles.leftIcon]} />
                    <TextInput
                        placeholder="Username"
                        style={styles.input}
                        placeholderTextColor="#9ca3af"
                        value={form.values.userName}
                        onChangeText={(value) => form.onChange("userName", value)}
                    />
                </View>
                {form.errors.userName && <Text style={styles.inputError}>{form.errors.userName}</Text>}
            </View>

            <View style={styles.inputContainer}>
                <View>
                    <Foundation name="telephone" size={20} color="#9ca3af" style={[styles.icon, styles.leftIcon]} />
                    <TextInput
                        placeholder="Phone Number"
                        keyboardType="numeric"
                        style={styles.input}
                        placeholderTextColor="#9ca3af"
                        value={form.values.phone}
                        onChangeText={(value) => form.onChange("phone", value)}
                    />
                </View>
                {form.errors.phone && <Text style={styles.inputError}>{form.errors.phone}</Text>}
            </View>

            <View style={styles.inputContainer}>
                <View>
                    <Feather name="user" size={20} color="#9ca3af" style={[styles.icon, styles.leftIcon]} />
                    <Dropdown
                        style={styles.input}
                        placeholder="Select Gender"
                        placeholderStyle={{ color: "#9ca3af" }}
                        iconStyle={{ marginRight: 16, width: 20, height: 20 }}
                        labelField="label"
                        valueField="value"
                        data={genders}
                        value={form.values.gender}
                        onChange={(gender) => form.onChange("gender", gender.value)}
                    />
                </View>
                {form.errors.gender && <Text style={styles.inputError}>{form.errors.gender}</Text>}
            </View>

            <View style={styles.inputContainer}>
                <View>
                    <Ionicons name="business" size={20} color="#9ca3af" style={[styles.icon, styles.leftIcon]} />
                    <TextInput
                        placeholder="Company Name"
                        style={styles.input}
                        placeholderTextColor="#9ca3af"
                        value={form.values.companyName}
                        onChangeText={(value) => form.onChange("companyName", value)}
                    />
                </View>
                {form.errors.companyName && <Text style={styles.inputError}>{form.errors.companyName}</Text>}
            </View>

            <View style={styles.inputContainer}>
                <View>
                    <Feather name="globe" size={20} color="#9ca3af" style={[styles.icon, styles.leftIcon]} />
                    <Dropdown
                        style={styles.input}
                        placeholder="Select Country"
                        placeholderStyle={{ color: "#9ca3af" }}
                        iconStyle={{ marginRight: 16, width: 20, height: 20 }}
                        labelField="label"
                        valueField="value"
                        data={countries}
                        value={form.values.country}
                        onChange={(country) => {
                            form.onChange("country", country.value);
                            if (country.value !== "United States") {
                                form.onChange("state", "");
                            }
                        }}
                        search
                        searchPlaceholder="Search country..."
                    />
                </View>
                {form.errors.country && <Text style={styles.inputError}>{form.errors.country}</Text>}
            </View>

            {form.values.country === "United States" &&
                <View style={styles.inputContainer}>
                    <View>
                        <Feather name="map" size={20} color="#9ca3af" style={[styles.icon, styles.leftIcon]} />
                        <Dropdown
                            style={styles.input}
                            placeholder="Select State"
                            placeholderStyle={{ color: "#9ca3af" }}
                            iconStyle={{ marginRight: 16, width: 20, height: 20 }}
                            labelField="label"
                            valueField="value"
                            data={states}
                            value={form.values.state}
                            onChange={(state) => form.onChange("state", state.value)}
                            search
                            searchPlaceholder="Search state..."
                        />
                    </View>
                    {form.errors.state && <Text style={styles.inputError}>{form.errors.state}</Text>}
                </View>
            }

            <View style={styles.inputContainer}>
                <View>
                    <Foundation name="marker" size={20} color="#9ca3af" style={[styles.icon, styles.leftIcon]} />
                    <TextInput
                        placeholder="Location"
                        style={styles.input}
                        placeholderTextColor="#9ca3af"
                        value={form.values.city}
                        onChangeText={(value) => form.onChange("city", value)}
                    />
                </View>
                {form.errors.city && <Text style={styles.inputError}>{form.errors.city}</Text>}
            </View>

            <View style={styles.inputContainer}>
                <View>
                    <Fontisto name="locked" size={20} color="#9ca3af" style={[styles.icon, styles.leftIcon]} />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={secure}
                        style={styles.input}
                        placeholderTextColor="#9ca3af"
                        value={form.values.password}
                        onChangeText={(value) => form.onChange("password", value)}
                    />
                    <Pressable onPress={() => setSecure(!secure)} style={[styles.icon, styles.rightIcon]}>
                        <Ionicons name={secure ? "eye" : "eye-off"} size={20} color="#9ca3af" />
                    </Pressable>
                </View>
                {form.errors.password && <Text style={styles.inputError}>{form.errors.password}</Text>}
            </View>

            <View style={styles.inputContainer}>
                <View>
                    <Fontisto name="locked" size={20} color="#9ca3af" style={[styles.icon, styles.leftIcon]} />
                    <TextInput
                        placeholder="Confirm Password"
                        secureTextEntry={confirmSecure}
                        style={styles.input}
                        placeholderTextColor="#9ca3af"
                        value={form.values.confirmPassword}
                        onChangeText={(value) => form.onChange("confirmPassword", value)}
                    />
                    <Pressable onPress={() => setConfirmSecure(!confirmSecure)} style={[styles.icon, styles.rightIcon]}>
                        <Ionicons name={confirmSecure ? "eye" : "eye-off"} size={20} color="#9ca3af" />
                    </Pressable>
                </View>
                {form.errors.confirmPassword && <Text style={styles.inputError}>{form.errors.confirmPassword}</Text>}
            </View>

            <Pressable
                disabled={loading || uploading}
                onPress={() => form.onSubmit(handleSubmit)}
                style={({ pressed }) => [
                    styles.button,
                    (loading || uploading) && styles.buttonDisabled,
                    pressed && styles.buttonPressed
                ]}
            >
                {(loading || uploading) ? (
                    <>
                        <ActivityIndicator color="#ffffff" style={{ marginRight: 8 }} />
                        <Text style={styles.buttonText}>Signing up...</Text>
                    </>
                ) : (
                    <Text style={styles.buttonText}>Signup</Text>
                )}
            </Pressable>

            <Text style={styles.bottomText}>
                Already have an account?{" "}
                <Text style={styles.link} onPress={() => navigation.navigate("Login")}>Login</Text>
            </Text>
        </View>
    )
};

export default Form;
