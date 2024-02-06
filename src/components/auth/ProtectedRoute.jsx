import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/slices/authSlice";
import { useLayoutEffect } from "react";

const ProtectedRoute = ({ inverse = false }) => {
    const dispatch = useDispatch();
    const isLoggedIn = Boolean(Cookies.get("isLoggedIn"));

    useLayoutEffect(() => {
        if (isLoggedIn) {
            const user = JSON.parse(Cookies.get("user"));
            dispatch(loginUser(user));
        }
    }, []);

    let res;
    if (inverse) {
        res = !isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
    } else {
        res = isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
    }
    return res;
};

export default ProtectedRoute;
