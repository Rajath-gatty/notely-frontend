import { cn } from "@/lib/utils";
import React from "react";

const Message = ({ message = "", sent = false, time, senderName }) => {
    return (
        <div className={cn(sent ? "self-end" : "self-start")}>
            <span className="text-xs text-slate-400 ">{senderName}</span>
            <div
                className={cn(
                    "p-2 rounded-md flex flex-col max-w-[250px] min-w-20",
                    sent ? "bg-indigo-900/60" : "bg-slate-600"
                )}
            >
                <p className="text-xs ">{message}</p>
                <span className="text-[11px] self-end leading-4 opacity-60">
                    {Intl.DateTimeFormat("en-IN", {
                        hour: "numeric",
                        minute: "numeric",
                    }).format(new Date(time))}
                </span>
            </div>
        </div>
    );
};

export default Message;
