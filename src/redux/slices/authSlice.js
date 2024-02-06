import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
    isLoggedIn: false,
    user: null,
    theme: "dark",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
    },
});

export const { loginUser, logoutUser, setTheme } = authSlice.actions;

export const getCurrentUser = (state) => state.auth.user;
export const isLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;
