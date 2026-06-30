import { useState } from "react";
import { View, Text, Image, TouchableOpacity, Linking, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "./FooterStyles";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { Toast } from 'toastify-react-native';
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../redux/loaderSlice";
import useApi from "../../hooks/useApi";
import truckService from "../../services/truckService";

const logo = require("../../../assets/images/footer_logo.png");

const Footer = () => {
    const [email, setEmail] = useState("");

    const routes = useNavigationState((state) => state.routes);
    const currentRoute = routes[routes.length - 1];
    const currentScreen = currentRoute?.name;

    const { user } = useSelector((state) => state.auth);
    const { execute, loading } = useApi(truckService.newsLetter);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const navLinks = [
        { name: 'Home', screen: 'Home', protected: false },
        { name: 'Listing', screen: 'Listing', protected: true },
        { name: 'Inventory', screen: 'Inventory', protected: true },
        { name: 'Plans', screen: 'Plans', protected: true },
        { name: 'Privacy', screen: 'Privacy', protected: false },
        { name: 'Contact Us', screen: 'ContactUs', protected: false },
    ];

    const handleNavigate = (screen) => {
        navigation.navigate(screen);
    };

    const handleSend = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return Toast.error("Email is required!");
        } else if (!emailRegex.test(email)) {
            return Toast.error("Please enter a valid email address!");
        }

        try {
            dispatch(showLoader());
            const response = await execute({ email });
            setEmail("");
            Toast.success(response.message);
        } catch (error) {
            Toast.error(error);
        } finally {
            dispatch(hideLoader());
        }
    };

    const handleOpenLink = async (url) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            console.warn("Can't open URL:", url);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handleNavigate('Home')}>
                <Image source={logo} alt="Trucby" style={styles.logo} />
            </TouchableOpacity>

            <View style={styles.subContainer}>
                <Text style={styles.inputLabel}>Newsletter</Text>
                <View>
                    <TextInput
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        style={styles.input}
                        placeholderTextColor="#9ca3af"
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                    />
                    <TouchableOpacity
                        onPress={handleSend}
                        style={styles.iconContainer}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <FontAwesome6 name="location-arrow" size={18} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.menuContainer}>
                {navLinks.map((item, index) => {
                    if (item.protected && !user) return null;

                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleNavigate(item.screen)}
                            style={[styles.menuItem, currentScreen === item.screen && styles.menuItemBorderBottom]}
                        >
                            <Text style={[styles.menuText, currentScreen === item.screen && styles.activeText]}>{item.name}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View style={styles.socialLinksContainer}>
                <TouchableOpacity
                    onPress={() => handleOpenLink("https://www.facebook.com/profile.php?id=61576747834064&mibextid=LQQJ4d")}
                    style={styles.socialLink}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <FontAwesome6 name="facebook-f" size={24} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handleOpenLink("https://www.instagram.com/truckbyapp?igsh=NTc4MTIwNjQ2YQ==")}
                    style={styles.socialLink}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <FontAwesome6 name="instagram" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <View>
                <Text style={styles.copyrightText}>© Copyright {new Date().getFullYear()} - Truckbyٖ</Text>
            </View>

        </View>
    )
};

export default Footer;