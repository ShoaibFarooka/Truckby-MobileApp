import { View, Text, TextInput, Pressable, ActivityIndicator } from "react-native";
import { styles } from "./FormStyles";
import { useNavigation } from '@react-navigation/native';
import Foundation from '@expo/vector-icons/Foundation';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../../../../redux/authSlice";
import * as SecureStore from 'expo-secure-store';
import { Toast } from 'toastify-react-native'
import * as yup from "yup";
import useForm from "../../../../../hooks/useForm";
import useApi from "../../../../../hooks/useApi";
import userService from "../../../../../services/userService";

const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
});

const Form = () => {
    const initialValues = {
        email: "",
        password: "",
    };
    const form = useForm(initialValues, schema);
    const { execute, loading, error } = useApi(userService.loginUser);
    const [secure, setSecure] = useState(true);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleSubmit = async (values) => {
        try {
            const response = await execute(values);
            if (response.accessToken && response.refreshToken) {
                await SecureStore.setItemAsync('refreshToken', response.refreshToken);
                dispatch(setAccessToken(response.accessToken));
                form.resetForm();
                navigation.replace("Home");
            } else {
                Toast.error("Unable to login");
            }
        } catch (loginError) {
            Toast.error(loginError);
        }
    };

    return (
        <View style={styles.container}>
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

            <Pressable
                disabled={loading}
                onPress={() => form.onSubmit(handleSubmit)}
                style={({ pressed }) => [
                    styles.button,
                    loading && styles.buttonDisabled,
                    pressed && styles.buttonPressed
                ]}
            >
                {loading ? (
                    <>
                        <ActivityIndicator color="#ffffff" style={{ marginRight: 8 }} />
                        <Text style={styles.buttonText}>Logging in...</Text>
                    </>
                ) : (
                    <Text style={styles.buttonText}>Login</Text>
                )}
            </Pressable>

            <Text style={styles.bottomText}>
                Don't have an account?{" "}
                <Text style={styles.link} onPress={() => navigation.navigate("Signup")}>Signup</Text>
            </Text>
        </View >
    )
};

export default Form;
