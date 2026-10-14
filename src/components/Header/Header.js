import { useState } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { Image } from 'expo-image';
import { styles } from "./HeaderStyles";
import Feather from '@expo/vector-icons/Feather';
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { Toast } from 'toastify-react-native';
import { showApiError } from '../../utils/apiError';
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../redux/loaderSlice";
import { clearAuth } from "../../redux/authSlice";
import * as SecureStore from 'expo-secure-store';
import useApi from "../../hooks/useApi";
import userService from "../../services/userService";

const logo = require("../../../assets/images/logo.png");
const profile = require('../../../assets/images/person.png');

// Full-width row so the whole line is tappable, not just the text
const MenuRow = ({ icon, label, active, danger, onPress }) => {
    const color = danger || active ? '#df0805' : '#333';
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.menuItem,
                active && styles.menuItemActive,
                pressed && styles.menuItemPressed,
            ]}
        >
            <Feather name={icon} size={20} color={color} />
            <Text style={[styles.menuText, { color }, active && styles.menuTextActive]}>{label}</Text>
        </Pressable>
    );
};

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const routes = useNavigationState((state) => state.routes);
    const currentRoute = routes[routes.length - 1];
    const currentScreen = currentRoute?.name;

    const { user } = useSelector((state) => state.auth);
    const { execute } = useApi(userService.logoutUser);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const navLinks = [
        { name: 'Home', screen: 'Home', icon: 'home', protected: false },
        { name: 'Listing', screen: 'Listing', icon: 'list', protected: true },
        { name: 'Inventory', screen: 'Inventory', icon: 'truck', protected: true },
        { name: 'My Plan', screen: 'Plans', icon: 'credit-card', protected: true },
        { name: 'Privacy', screen: 'Privacy', icon: 'shield', protected: false },
        { name: 'Contact Us', screen: 'ContactUs', icon: 'mail', protected: false },
    ];

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    // Inventory also shows other sellers, so it only counts as "here" for the user's own inventory
    const isActive = (screen) =>
        screen === currentScreen &&
        (screen !== "Inventory" || currentRoute?.params?.userId === user?._id);

    const handleNavigate = (screen) => {
        // Close the menu on every tap, so it isn't left open behind the next screen
        setIsMenuOpen(false);
        // Already here: closing the menu is enough
        if (isActive(screen)) return;

        if (screen === "Inventory") {
            navigation.navigate("Inventory", {
                userId: user._id,
            });
            return;
        }

        navigation.navigate(screen);
    };

    const handleLogout = async () => {
        setIsMenuOpen(false);
        try {
            dispatch(showLoader());
            const refreshToken = await SecureStore.getItemAsync('refreshToken');
            const response = await execute({ refreshToken });
            Toast.success(response.message);
            await SecureStore.deleteItemAsync('refreshToken');
            dispatch(clearAuth());
            navigation.replace("Login");
        } catch (error) {
            showApiError(error, "Unable to log out. Please try again.");
        } finally {
            dispatch(hideLoader());
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <TouchableOpacity onPress={() => handleNavigate('Home')}>
                    <Image source={logo} style={styles.logo} contentFit="contain" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={toggleMenu}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    {isMenuOpen ? (
                        <Feather name="x" size={24} />
                    ) : (
                        <Feather name="menu" size={24} />
                    )}
                </TouchableOpacity>
            </View>

            {isMenuOpen && (
                <View style={styles.menuContainer}>
                    {user && (
                        <View style={styles.accountCard}>
                            <Image
                                source={user?.image ? user.image : profile}
                                style={styles.profileImage}
                                contentFit="cover"
                                cachePolicy="memory-disk"
                            />
                            <View style={styles.accountInfo}>
                                <Text style={styles.accountName} numberOfLines={1}>
                                    {user.name || user.userName}
                                </Text>
                                {!!user.email && (
                                    <Text style={styles.accountEmail} numberOfLines={1}>{user.email}</Text>
                                )}
                            </View>
                        </View>
                    )}

                    {navLinks.map((item) => {
                        if (item.protected && !user) return null;
                        return (
                            <MenuRow
                                key={item.screen}
                                icon={item.icon}
                                label={item.name}
                                active={isActive(item.screen)}
                                onPress={() => handleNavigate(item.screen)}
                            />
                        );
                    })}

                    {!user ? (
                        <>
                            <TouchableOpacity
                                onPress={() => handleNavigate('Login')}
                                style={styles.authButton}
                            >
                                <Text style={styles.authText}>Sign In</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => handleNavigate('Signup')}
                                style={styles.sellButton}
                            >
                                <Text style={styles.sellText}>Sell Your Truck</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <View style={styles.divider} />
                            <MenuRow
                                icon="user"
                                label="My Profile"
                                active={isActive('Profile')}
                                onPress={() => handleNavigate('Profile')}
                            />
                            <MenuRow
                                icon="log-out"
                                label="Log out"
                                danger
                                onPress={handleLogout}
                            />
                        </>
                    )}
                </View>
            )}


        </View>
    )
};

export default Header;