import Navlink from "./Navlink";
import { Link, useLocation } from "react-router-dom";
import ConnectedUsers from "../BoardSession/CollabBar/ConnectedUsers";
import { useSelector } from "react-redux";
import { getCurrentUser, isLoggedIn } from "@/redux/slices/authSlice";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = ({ setIsCollapsed }) => {
    const { pathname } = useLocation();
    const isAuth = useSelector(isLoggedIn);
    const user = useSelector(getCurrentUser);

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
                    <h1 className="primary-gradient inline text-transparent bg-clip-text text-[22px] md:text-3xl font-bold">
                        <Link to="/">Notely</Link>
                    </h1>
                </div>
                {isAuth && <ConnectedUsers />}
                <div className="flex md:gap-14 gap-4 items-center">
                    <div className={cn("flex gap-6")}>
                        {/* {<Navlink to="/pricing">Pricing</Navlink>} */}
                        {!isAuth && <Navlink to="/login">Login</Navlink>}
                        {!isAuth && <Navlink to="/signup">Signup</Navlink>}
                    </div>
                    {isAuth && (
                        <div className="flex items-center gap-3 py-4">
                            <span className="text-xs  md:text-sm text-slate-500 dark:text-white font-medium">
                                {user.name}
                            </span>
                            <img
                                src={user.avatar}
                                alt="avatar"
                                className=" w-[30px] md:w-[35px]"
                            />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
