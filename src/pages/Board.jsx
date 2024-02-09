import CollabBar from "@/components/BoardSession/CollabBar/CollabBar";
import PageEditor from "@/components/BoardSession/PageEditor/PageEditor";
import Sidebar from "@/components/BoardSession/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import { useState } from "react";

const Board = () => {
    const isMobile = window.innerWidth < 700;
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <div className="h-full">
            <Navbar setIsCollapsed={setIsCollapsed} />
            {isMobile && !isCollapsed && (
                <div
                    onClick={() => setIsCollapsed(true)}
                    className="absolute w-full h-full inset-0 bg-black/60 z-[999]"
                ></div>
            )}
            <div className="flex h-[calc(100vh-69px)] overflow-hidden">
                <Sidebar
                    isMobile={isMobile}
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                />
                <PageEditor />
                <CollabBar />
            </div>
        </div>
    );
};

export default Board;
