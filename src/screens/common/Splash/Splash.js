import { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as SecureStore from 'expo-secure-store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setAuth } from '../../../redux/authSlice';
import { verifyAuthentication } from '../../../utils/authUtils';
import useApi from '../../../hooks/useApi';
import userService from '../../../services/userService';

const Splash = () => {
    const dotsCount = 3;
    const animationDuration = 1100; // total duration per dot animation
    const overlapDuration = animationDuration / 2.4; // when to start next dot animation
    const [activeDot, setActiveDot] = useState(0);
    const dotRefs = useRef([]);

    const { execute, loading } = useApi(userService.refreshToken);
    const { accessToken } = useSelector(state => state.auth);
    const isAuthenticated = verifyAuthentication(accessToken);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        const handleAuthOnStartup = async () => {
            // Ensure splash screen shows for at least 2 seconds
            const delay = new Promise(resolve => setTimeout(resolve, 2000));

            if (isAuthenticated) {
                await delay;
                navigation.replace('Home');
                return;
            }

            const refreshToken = await SecureStore.getItemAsync('refreshToken');
            if (!refreshToken) {
                await delay;
                navigation.replace('Login');
                return;
            }

            try {
                console.log("Refreshing Token On Startup....");
                const response = await execute({ refreshToken });
                if (response.newAccessToken && response.newRefreshToken && response.user) {
                    await SecureStore.setItemAsync('refreshToken', response.newRefreshToken);
                    dispatch(setAuth({ token: response.newAccessToken, user: response.user }))
                    navigation.replace("Home");
                }
            } catch (error) {
                await SecureStore.deleteItemAsync('refreshToken');
                navigation.replace('Login');
            }
        };

        handleAuthOnStartup();
    }, [accessToken, dispatch, navigation]);

    useEffect(() => {
        // Animate the current active dot
        if (dotRefs.current[activeDot]) {
            dotRefs.current[activeDot].animate(
                {
                    0: { scale: 1 },
                    0.5: { scale: 1.8 },
                    1: { scale: 1 },
                },
                animationDuration
            );
        }

        // Schedule the next dot animation to start after overlapDuration
        const timeout = setTimeout(() => {
            setActiveDot((prev) => (prev + 1) % dotsCount);
        }, overlapDuration);

        return () => clearTimeout(timeout);
    }, [activeDot]);

    return (
        <View style={styles.container}>
            {/* <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" /> */}

            <Animatable.Image
                animation="fadeInDown"
                duration={1500}
                source={require('../../../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <View style={styles.dotsContainer}>
                {[...Array(dotsCount)].map((_, i) => (
                    <Animatable.View
                        key={i}
                        ref={(ref) => (dotRefs.current[i] = ref)}
                        style={styles.dot}
                    />
                ))}
            </View>
        </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 40,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
    },
    dot: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: '#e5460cff',
        marginHorizontal: 5,
    },
});
