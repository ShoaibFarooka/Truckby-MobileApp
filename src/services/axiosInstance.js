import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import store from '../redux/store.js';
import { setAccessToken, clearAuth } from '../redux/authSlice.js';

const { baseUrl } = Constants.expoConfig.extra;

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Helper to get access token from Redux store state
const getAccessToken = () => {
    const state = store.getState();
    return state.auth.accessToken;
};

// Helper to get refresh token from SecureStore
const getRefreshToken = async () => {
    return await SecureStore.getItemAsync('refreshToken');
};

// Helper to set new access token in Redux store
const setNewAccessToken = (token) => {
    store.dispatch(setAccessToken(token));
};

// Helper to clear auth on logout
const clearAuthState = () => {
    store.dispatch(clearAuth());
    SecureStore.deleteItemAsync('refreshToken');
};

axiosInstance.interceptors.request.use(
    async (config) => {
        config.headers['x-client-type'] = 'native';
        if (!config.skipAuthRefresh) {
            const accessToken = getAccessToken();
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (token) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
};

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (!error.response) {
            return Promise.reject(new Error('Network error. Please check your internet connection.'));
        }
        const { config, response: { status } } = error;
        const originalRequest = config;
        if (status === 401 && !originalRequest._retry && !originalRequest.skipAuthRefresh) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    console.log('Refreshing token...');
                    const refreshToken = await getRefreshToken();
                    if (!refreshToken) {
                        throw new Error('No refresh token available');
                    }

                    //pass refresh token as well
                    const response = await axios.post(`${baseUrl}/api/user/refresh-token`, {});
                    const { token: newToken } = response.data;
                    setNewAccessToken(newToken);
                    onRefreshed(newToken);
                    console.log('Refresh token done!');
                    return axiosInstance(originalRequest);
                } catch (err) {
                    console.log('Error in refreshing token: ', err);
                    clearAuthState();
                    // navigate user to login screen
                    return Promise.reject(err);
                }
                finally {
                    isRefreshing = false;
                }
            }
            console.log('Refresh token already in progress, falling back to queue');
            const retryOriginalRequest = new Promise((resolve) => {
                const callback = (token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    resolve(axiosInstance(originalRequest));
                }
                addRefreshSubscriber(callback);
            });

            return retryOriginalRequest;
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;