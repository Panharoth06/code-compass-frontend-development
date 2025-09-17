// lib/services/auth/authSlice.ts
/*eslint-disable*/
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    refreshToken: string | null;
    user: any | null;
}

const initialState: AuthState = {
    token: null,
    refreshToken: null,
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // combined action
        setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
            state.token = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setRefreshToken: (state, action: PayloadAction<string>) => {
            state.refreshToken = action.payload;
        },
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.refreshToken = null;
            state.user = null;
        },
    },
});

export const { 
    setTokens, 
    setAccessToken, 
    setRefreshToken, 
    setUser, 
    logout 
} = authSlice.actions;

export default authSlice.reducer;