import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { getConnectedUsers } from "@/redux/slices/appSlice";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ConnectedUsers = () => {
    const { pathname } = useLocation();
    const connectedUsers = useSelector(getConnectedUsers);
    return (
        <>
            {pathname.startsWith("/board") && (
                <div className="flex justify-evenly items-center gap-2">
                    <div className="py-4 px-2 flex gap-2 justify-center items-center">
                        {connectedUsers.map((user) => (
                            <TooltipProvider key={user._id}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <img
                                            key={user._id}
                                            src={user.avatar}
                                            className=" w-[25px] md:w-[30px]"
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{user.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default ConnectedUsers;
