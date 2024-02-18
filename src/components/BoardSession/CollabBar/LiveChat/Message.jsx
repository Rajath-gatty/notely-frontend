import { cn } from "@/lib/utils";
import React from "react";

const Message = ({
    message = "",
    sent = false,
    time,
    senderName,
    senderAvatar,
    showSenderProfile = true,
    showSenderAvatar,
}) => {
    return (
        <div className={cn(sent ? "self-end" : "self-start", "mb-1")}>
            <div className="flex gap-2">
                <img
                    className={cn(
                        "w-[22px] self-end mb-1",
                        sent ? "order-2" : "order-1"
                    )}
                    src={showSenderAvatar ? senderAvatar : ""}
                />
                <div
                    className={cn(
                        "flex flex-col",
                        sent ? "order-1" : "order-2"
                    )}
                >
                    {showSenderProfile && (
                        <span className="text-xs text-slate-400 mt-2 mb-1">
                            {senderName}
                        </span>
                    )}
                    <div
                        className={cn(
                            "p-2 rounded-md flex flex-col max-w-[250px] ",
                            sent ? "bg-blue-600" : " bg-indigo-900/60"
                        )}
                    >
                        <p className="text-xs ">{message}</p>
                        {/* <span className="text-[11px] self-end leading-4 opacity-60">
                        {Intl.DateTimeFormat("en-IN", {
                            hour: "numeric",
                            minute: "numeric",
                        }).format(new Date(time))}
                    </span> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;
