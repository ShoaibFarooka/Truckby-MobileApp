import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showLoader, hideLoader } from './loaderSlice';
import { setUser } from './authSlice';
import userService from '../services/userService';

const initialState = {
    user: null,
    userError: null,
    loading: false
};

// Define an async thunk for fetching user info
export const fetchUserInfo = createAsyncThunk(
    'user/fetchUserInfo',
    async (_, { dispatch, getState }) => {
        dispatch(showLoader());
        try {
            const response = await userService.getUserInfo();
            // The Header and other screens read the user from the auth slice, so keep it in sync
            // (e.g. a new profile photo); skip if the user logged out while this was loading
            const { auth } = getState();
            if (auth.accessToken && response?.user) {
                dispatch(setUser({ ...auth.user, ...response.user }));
            }
            return response.user;
        } catch (error) {
            throw error;
        } finally {
            dispatch(hideLoader());
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUser(state) {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.pending, (state) => {
                state.loading = true;
                state.userError = null;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.user = action.payload;
                state.userError = null;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.userError = action.error.message;
            });
    }
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
