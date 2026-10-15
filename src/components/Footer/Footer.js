import { useState } from "react";
import { View, Text, Image, TouchableOpacity, Linking, TextInput } from "react-native";
import { styles } from "./FooterStyles";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { Toast } from 'toastify-react-native';
import { showApiError } from '../../utils/apiError';
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../redux/loaderSlice";
import useApi from "../../hooks/useApi";
import truckService from "../../services/truckService";

const logo = require("../../../assets/images/footer_logo.png");

const quickLinks = [
    { name: 'Home', screen: 'Home' },
    { name: 'Browse Equipment', screen: 'Filter' },
    { name: 'Contact Us', screen: 'ContactUs' },
    { name: 'Privacy Policy', screen: 'Privacy' },
];

const accountLinks = [
    { name: 'My Listings', screen: 'Listing' },
    { name: 'My Inventory', screen: 'Inventory' },
    { name: 'My Plan', screen: 'Plans' },
];

const guestLinks = [
    { name: 'Log In', screen: 'Login' },
    { name: 'Sign Up', screen: 'Signup' },
];

const socialLinks = [
    { icon: 'facebook-f', url: 'https://www.facebook.com/profile.php?id=61576747834064&mibextid=LQQJ4d' },
    { icon: 'instagram', url: 'https://www.instagram.com/truckbyapp?igsh=NTc4MTIwNjQ2YQ==' },
];

const Footer = () => {
    const [email, setEmail] = useState("");

    const routes = useNavigationState((state) => state.routes);
    const currentScreen = routes[routes.length - 1]?.name;

    const { user } = useSelector((state) => state.auth);
    const { execute } = useApi(truckService.newsLetter);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleNavigate = (screen) => {
        // Inventory shows a specific seller, so pass the current user's id
        if (screen === 'Inventory') {
            navigation.navigate('Inventory', { userId: user?._id });
            return;
        }
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
            showApiError(error, "Unable to subscribe. Please try again.");
        } finally {
            dispatch(hideLoader());
        }
    };

    const handleOpenLink = async (url) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Toast.error("Unable to open this link");
        }
    };

    const renderLink = (item) => {
        const isActive = currentScreen === item.screen;
        return (
            <TouchableOpacity
                key={item.screen}
                onPress={() => handleNavigate(item.screen)}
                style={styles.linkItem}
                hitSlop={{ top: 6, bottom: 6 }}
            >
                <Text style={[styles.linkText, isActive && styles.linkTextActive]}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* ── Brand ── */}
            <View style={styles.brand}>
                <TouchableOpacity onPress={() => handleNavigate('Home')}>
                    <Image source={logo} alt="Truckby" style={styles.logo} />
                </TouchableOpacity>
                <Text style={styles.tagline}>
                    Buy, sell and lease trucks and equipment with confidence.
                </Text>
            </View>

            {/* ── Newsletter ── */}
            <View style={styles.newsletter}>
                <Text style={styles.sectionTitle}>Newsletter</Text>
                <Text style={styles.newsletterText}>Get the latest listings and updates in your inbox.</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                        placeholderTextColor="#9ca3af"
                        value={email}
                        onChangeText={setEmail}
                        onSubmitEditing={handleSend}
                        returnKeyType="send"
                    />
                    <TouchableOpacity
                        onPress={handleSend}
                        style={styles.sendButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <FontAwesome6 name="location-arrow" size={16} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* ── Links ── */}
            <View style={styles.linkColumns}>
                <View style={styles.linkColumn}>
                    <Text style={styles.sectionTitle}>Quick Links</Text>
                    {quickLinks.map(renderLink)}
                </View>

                <View style={styles.linkColumn}>
                    <Text style={styles.sectionTitle}>{user ? 'My Account' : 'Account'}</Text>
                    {(user ? accountLinks : guestLinks).map(renderLink)}
                </View>
            </View>

            {/* ── Bottom bar ── */}
            <View style={styles.divider} />

            <View style={styles.bottomBar}>
                <View style={styles.socialRow}>
                    {socialLinks.map((social) => (
                        <TouchableOpacity
                            key={social.icon}
                            onPress={() => handleOpenLink(social.url)}
                            style={styles.socialButton}
                            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                        >
                            <FontAwesome6 name={social.icon} size={16} color="#fff" />
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.copyrightText}>© {new Date().getFullYear()} Truckby. All rights reserved.</Text>
            </View>
        </View>
    );
};

export default Footer;
