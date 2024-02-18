import React from "react";
import LiveChat from "./LiveChat/LiveChat";
import Share from "./Share";

const CollabBar = () => {
    return (
        <div className="flex-[0.5] bg-slate-900 border-l h-full dark:border-slate-800 hidden md:block">
            <Share />
            <LiveChat />
        </div>
    );
};

export default CollabBar;
