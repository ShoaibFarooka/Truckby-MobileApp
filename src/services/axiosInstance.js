import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import { Toast } from 'toastify-react-native';
import store from '../redux/store.js';
import { setAuth, clearAuth } from '../redux/authSlice.js';
import { createSessionExpiredError } from '../utils/apiError.js';

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

// Photo uploads can take minutes on a slow connection; still capped so a stalled upload can't hang the loader
export const UPLOAD_TIMEOUT = 180000;

const axiosInstance = axios.create({
    baseURL: baseUrl,
    // Fail hung requests so the global loader (hidden in each caller's finally) can't stay up forever
    timeout: 20000,
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

// Helper to set refresh token in SecureStore
const setRefreshToken = async (newRefreshToken) => {
    return await SecureStore.setItemAsync('refreshToken', newRefreshToken);
};

// Helper to set new auth in Redux store
const setNewAuth = (newAccessToken, user) => {
    store.dispatch(setAuth({ token: newAccessToken, user }));
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

// Several requests can fail together when the session ends; announce it only once
let sessionExpiredNotifiedAt = 0;
const notifySessionExpired = () => {
    if (Date.now() - sessionExpiredNotifiedAt < 5000) return;
    sessionExpiredNotifiedAt = Date.now();
    Toast.error('Your session has expired. Please log in again.');
};

// One shared refresh: every request that gets a 401 while it runs awaits the same
// promise. The server rotates refresh tokens, so a second parallel refresh would
// send an already-used token, get "Invalid refresh token!" and log the user out.
let refreshPromise = null;

const refreshSession = () => {
    if (refreshPromise) return refreshPromise;

    refreshPromise = (async () => {
        console.log('Refreshing token...');
        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        // Plain axios skips the request interceptor, so send the native client
        // header explicitly; without it the server looks for a web cookie,
        // returns 401 "Refresh token not found!" and the user gets logged out
        const response = await axios.post(
            `${baseUrl}/api/user/refresh-token`,
            { refreshToken },
            { headers: { 'x-client-type': 'native' }, timeout: 20000 }
        );
        const { newAccessToken, newRefreshToken, user } = response.data || {};
        if (!newAccessToken || !newRefreshToken) {
            throw new Error('Invalid refresh response');
        }
        // Store the rotated refresh token before releasing waiting requests
        await setRefreshToken(newRefreshToken);
        setNewAuth(newAccessToken, user);
        console.log('Axios Instance Refresh Token Done!');
        return newAccessToken;
    })()
        .catch((err) => {
            console.log('Error in refreshing token: ', err?.response?.data || err?.message);
            // Only end the session when there is no token or the server rejected it;
            // keep it on network errors/timeouts so the next request can retry
            const refreshStatus = err?.response?.status;
            const sessionEnded = err?.message === 'No refresh token available'
                || refreshStatus === 401 || refreshStatus === 403;

            if (sessionEnded) {
                clearAuthState();
                notifySessionExpired();
                // Screens skip this error (see showApiError), so the user sees one toast
                throw createSessionExpiredError();
            }
            if (!err?.response) {
                throw new Error('Network error. Please check your internet connection.');
            }
            throw new Error('Could not refresh your session. Please try again.');
        })
        .finally(() => {
            refreshPromise = null;
        });

    return refreshPromise;
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
        // Only refresh for requests made with a session; a guest's 401 is a normal error
        const hadSession = !!originalRequest.headers?.Authorization;
        if (status === 401 && hadSession && !originalRequest._retry && !originalRequest.skipAuthRefresh) {
            originalRequest._retry = true;

            const sentToken = String(originalRequest.headers.Authorization).replace('Bearer ', '');
            const currentToken = getAccessToken();

            // Already logged out by an earlier failed refresh: stay silent, don't refresh again
            if (!currentToken) {
                return Promise.reject(createSessionExpiredError());
            }

            // This request was sent with an old token that has since been refreshed
            // (its 401 arrived after the refresh finished): just retry with the new one
            if (sentToken !== currentToken) {
                return axiosInstance(originalRequest);
            }

            // The request interceptor attaches the new access token on retry
            await refreshSession();
            return axiosInstance(originalRequest);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;