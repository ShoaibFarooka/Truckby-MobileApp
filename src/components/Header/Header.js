import { useState } from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { styles } from "./HeaderStyles";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { Toast } from 'toastify-react-native';
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../redux/loaderSlice";
import { clearAuth } from "../../redux/authSlice";
import * as SecureStore from 'expo-secure-store';
import useApi from "../../hooks/useApi";
import userService from "../../services/userService";

const logo = require("../../../assets/images/logo.png");
const profile = require('../../../assets/images/person.png');

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const routes = useNavigationState((state) => state.routes);
    const currentRoute = routes[routes.length - 1];
    const currentScreen = currentRoute?.name;

    const { user } = useSelector((state) => state.auth);
    const { execute, loading } = useApi(userService.logoutUser);
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

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
        setIsProfileOpen(false);
    };

    const handleNavigate = (screen) => {
        if (screen === "Inventory") {
            navigation.navigate("Inventory", {
                userId: user._id,
            });
            return;
        }

        navigation.navigate(screen);
    };

    const handleLogout = async () => {
        try {
            dispatch(showLoader());
            const refreshToken = await SecureStore.getItemAsync('refreshToken');
            const response = await execute({ refreshToken });
            Toast.success(response.message);
            await SecureStore.deleteItemAsync('refreshToken');
            dispatch(clearAuth());
            navigation.replace("Login");
        } catch (error) {
            Toast.error(error);
        } finally {
            dispatch(hideLoader());
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <TouchableOpacity onPress={() => handleNavigate('Home')}>
                    <Image source={logo} alt="Truckby" style={styles.logo} />
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
                        <View style={styles.profileSection}>
                            <Pressable
                                onPress={() => setIsProfileOpen(!isProfileOpen)}
                                style={styles.profileContainer}
                            >
                                <Image
                                    source={user?.image ? { uri: user.image } : profile}
                                    style={styles.profileImage}
                                />
                                <Text style={styles.profileName}>
                                    {user.userName?.split('@')[0].slice(0, 10)}
                                </Text>
                                <View style={styles.profileIconConatiner}>
                                    {isProfileOpen ?
                                        <AntDesign name="up" size={14} />
                                        :
                                        <AntDesign name="down" size={14} />
                                    }
                                </View>
                            </Pressable>

                            {isProfileOpen && (
                                <View style={styles.dropdown}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setIsProfileOpen(false);
                                            handleNavigate('Profile');
                                        }}
                                    >
                                        <Text style={styles.dropdownItem}>Profile</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={handleLogout}>
                                        <Text style={[styles.dropdownItem, { color: 'red' }]}>
                                            Log out
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    )}
                </View>
            )}


        </View>
    )
};

export default Header;