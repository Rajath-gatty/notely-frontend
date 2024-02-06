import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const Navlink = ({ to, children }) => {
    const { pathname } = useLocation();

    return (
        <Link
            className={cn(
                "py-6 px-4 relative text-sm",
                pathname === to
                    ? "dark:text-slate-100 text-slate-800 font-bold"
                    : "dark:hover:text-slate-500 dark:text-slate-400 hover:text-slate-400"
            )}
            to={to}
        >
            {children}
            {pathname === to && (
                <div className="absolute rounded-full left-0 bottom-0 w-full h-[2px] bg-indigo-700"></div>
            )}
        </Link>
    );
};

export default Navlink;
