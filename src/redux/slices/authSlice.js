import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
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
            Cookies.set("isLoggedIn", true, { expires: 7 });
            Cookies.set("user", JSON.stringify(action.payload), { expires: 7 });
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            Cookies.remove("isLoggedIn");
            Cookies.remove("user");
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        upgradeMembership: (state) => {
            state.user.plan = "pro";
            Cookies.set("isLoggedIn", true, { expires: 7 });
            Cookies.set(
                "user",
                JSON.stringify({ ...state.user, plan: "pro" }),
                { expires: 7 }
            );
        },
    },
});

export const { loginUser, logoutUser, setTheme, upgradeMembership } =
    authSlice.actions;

export const getCurrentUser = (state) => state.auth.user;
export const isLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;
