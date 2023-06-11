import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isFetching: false,
        error: false,
        userData: null,
        message: '',
    },
    reducers: {
        updateUserData(state, action) {
            state.userData = { ...action.payload, accessToken: state.userData.accessToken };
        },
        deleteMessage(state) {
            state.message = '';
        },
        registerStart(state) {
            state.isFetching = true;
        },
        registerSuccess(state) {
            state.error = false;
            state.isFetching = false;
            state.message = '';
        },
        registerFailure(state, action) {
            state.error = true;
            state.isFetching = false;
            state.message = action.payload;
        },
        loginStart(state) {
            state.isFetching = true;
        },
        loginSuccess(state, action) {
            state.error = false;
            state.isFetching = false;
            state.userData = action.payload;
            state.message = '';
        },
        loginFailure(state, action) {
            state.error = true;
            state.userData = null;
            state.isFetching = false;
            state.message = action.payload;
        },
        logoutStart(state) {
            state.isFetching = true;
        },
        logoutSuccess(state) {
            state.error = false;
            state.isFetching = false;
            state.userData = null;
        },
        logoutFailure(state, action) {
            state.error = true;
            state.isFetching = false;
            state.message = action.payload;
        },
        refreshStart(state) {
            state.isFetching = true;
        },
        refreshSuccess(state, action) {
            state.isFetching = false;
            state.userData = action.payload;
            state.error = false;
            state.message = '';
        },
        refreshFailure(state, action) {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload;
        },
    },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
