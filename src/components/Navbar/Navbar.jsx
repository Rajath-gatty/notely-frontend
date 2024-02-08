import React, { useEffect } from "react";
import Navlink from "./Navlink";
import { Link, useNavigate } from "react-router-dom";
import ConnectedUsers from "../BoardSession/CollabBar/ConnectedUsers";
import { Button } from "../ui/button";
import { useLogoutMutation } from "@/redux/api/apiSlice";
import { useSelector } from "react-redux";
import { getCurrentUser, isLoggedIn } from "@/redux/slices/authSlice";

const Navbar = () => {
    const navigate = useNavigate();
    const isAuth = useSelector(isLoggedIn);
    const user = useSelector(getCurrentUser);
    const [logout, { isLoading, isSuccess }] = useLogoutMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate("/login");
        }
    }, [isSuccess]);

    return (
        <nav className="bg-slate-50 dark:bg-slate-900 dark:border-b dark:border-gray-800 px-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="primary-gradient inline text-transparent bg-clip-text text-3xl font-bold">
                    <Link to="/">Notely</Link>
                </h1>
                <div className="flex gap-14 items-center">
                    {isAuth && (
                        <div className="flex gap-6 items-center">
                            <ConnectedUsers />
                            <Button onClick={() => logout()}>
                                {isLoading ? "Logging out..." : "Logout"}
                            </Button>
                        </div>
                    )}
                    <div className="flex gap-6 ">
                        {<Navlink to="/pricing">Pricing</Navlink>}
                        {!isAuth && <Navlink to="/login">Login</Navlink>}
                        {!isAuth && <Navlink to="/signup">Signup</Navlink>}
                    </div>
                    {isAuth && (
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-slate-500 dark:text-white font-medium">
                                {user.name}
                            </span>
                            <img
                                src={user.avatar}
                                alt="avatar"
                                className="w-[35px]"
                            />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
