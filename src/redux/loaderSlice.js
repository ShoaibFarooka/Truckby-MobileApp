import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        activeRequests: 0,
    },
    reducers: {
        showLoader: (state) => {
            state.activeRequests += 1;
        },
        hideLoader: (state) => {
            state.activeRequests = Math.max(state.activeRequests - 1, 0);
        },
        resetLoader: (state) => {
            state.activeRequests = 0;
        }
    },
});

export const { showLoader, hideLoader, resetLoader } = loaderSlice.actions;

export default loaderSlice.reducer;