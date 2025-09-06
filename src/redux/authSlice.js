import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: null,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAuth: (state, action) => {
            state.accessToken = action.payload.token;
            state.user = action.payload.user;
        },
        clearAuth: (state) => {
            state.accessToken = null;
            state.user = null;
        },
    },
});

export const { setAccessToken, setUser, setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;