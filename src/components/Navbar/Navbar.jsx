import Navlink from "./Navlink";
import { Link, useLocation } from "react-router-dom";
import ConnectedUsers from "../BoardSession/CollabBar/ConnectedUsers";
import { useSelector } from "react-redux";
import { getCurrentUser, isLoggedIn } from "@/redux/slices/authSlice";
import { LogOut, Menu, Trash, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useLogoutMutation } from "@/redux/api/apiSlice";

const Navbar = ({ setIsCollapsed }) => {
    const { pathname } = useLocation();
    const isAuth = useSelector(isLoggedIn);
    const user = useSelector(getCurrentUser);
    const [logout] = useLogoutMutation();

    return (
        <nav className="bg-slate-50 dark:bg-slate-900 dark:border-b dark:border-gray-800 px-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    {pathname.includes("/board") && (
                        <Menu
                            size={20}
                            className="md:mr-4 cursor-pointer hover:opacity-50"
                            onClick={() => setIsCollapsed(false)}
                        />
                    )}
                    <div className="relative">
                        <h1 className="primary-gradient inline text-transparent bg-clip-text text-[22px] md:text-3xl font-bold mr-2">
                            <Link to="/">Notely</Link>
                        </h1>
                        {user?.plan === "pro" && (
                            <Badge className="absolute top-0" variant="primary">
                                Pro
                            </Badge>
                        )}
                    </div>
                </div>
                {isAuth && <ConnectedUsers />}
                <div className="flex md:gap-14 gap-4 items-center">
                    <div className="flex gap-6">
                        {user?.plan !== "pro" && (
                            <Navlink to="/pricing">Pricing</Navlink>
                        )}
                        {!isAuth && <Navlink to="/login">Login</Navlink>}
                        {!isAuth && <Navlink to="/signup">Signup</Navlink>}
                    </div>
                    {isAuth && (
                        <div>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className="flex items-center gap-3 cursor-pointer py-4">
                                        <span className="text-xs  md:text-sm text-slate-500 dark:text-white font-medium">
                                            {user.name}
                                        </span>
                                        <img
                                            src={user.avatar}
                                            alt="avatar"
                                            className=" w-[30px] md:w-[35px]"
                                        />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-[150px] dark:bg-slate-950 p-0  cursor-pointer">
                                    <div className="flex flex-col items-start justify-center">
                                        <Link
                                            className="w-full h-full"
                                            to="/profile"
                                        >
                                            <div className="flex gap-3 items-center group justify-center w-full hover:bg-slate-800 p-4">
                                                <UserRound size={20} />
                                                <span className="text-[15px] mt-1">
                                                    Profile
                                                </span>
                                            </div>
                                        </Link>
                                        <div
                                            onClick={() => logout()}
                                            className="flex gap-3 items-center group justify-center hover:bg-slate-800 w-full p-4 text-red-600 text-[15px]"
                                        >
                                            <LogOut size={18} />
                                            Logout
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
