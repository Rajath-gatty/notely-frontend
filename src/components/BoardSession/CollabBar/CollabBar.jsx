import React from "react";
import ConnectedUsers from "./ConnectedUsers";
import LiveChat from "./LiveChat/LiveChat";

const CollabBar = () => {
    return (
        <div className="flex-[0.5] bg-slate-900 border-l h-full dark:border-slate-800">
            {/* <ConnectedUsers /> */}
            <LiveChat />
        </div>
    );
};

export default CollabBar;
