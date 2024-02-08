import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import Page from "./Page";
import { useMediaQuery } from "usehooks-ts";
import { useGetPagesQuery, usePostPageMutation } from "@/redux/api/apiSlice";
import { useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Sidebar = ({ isMobile, isCollapsed }) => {
    const { boardId } = useParams();
    const sidebarRef = useRef(null);
    const [isResizing, setIsResizing] = useState(false);

    const { isLoading, data = [], isError } = useGetPagesQuery(boardId);
    const [postPage, { isSuccess }] = usePostPageMutation();

    const handleMouseMove = (e) => {
        if (isResizing) return;

        let newWidth = e.clientX;
        if (newWidth > 500) newWidth = 500;
        if (newWidth < 250) newWidth = 250;
        sidebarRef.current.style.width = `${newWidth}px`;
    };

    const handleMouseUp = () => {
        setIsResizing(false);

        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = () => {
        setIsResizing(true);

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleAddPage = () => {
        const page = {
            title: "Untitled",
            parentId: null,
            boardId,
        };
        postPage(page);
    };

    return (
        <div
            ref={sidebarRef}
            className={cn(
                "bg-slate-900 w-[250px]  border-r dark:border-slate-800 select-none",
                isResizing && "cursor-col-resize",
                isMobile && "absolute left-0 top-0 min-w-[200px] h-full z-9999",
                isCollapsed && "-left-[250px] transition"
            )}
        >
            <div
                onMouseDown={handleMouseDown}
                className={cn(
                    "absolute top-0 right-0 w-1 h-full hover:bg-indigo-700 cursor-col-resize",
                    isResizing && "bg-indigo-700 cursor-col-resize z-[950]"
                )}
            />
            <div>
                <h3 className="font-bold select-none mt-4 mb-3 text-xs uppercase text-center text-slate-300">
                    Mountains trip 2023
                </h3>
                <ul>
                    {!isLoading ? (
                        data.map((page) => {
                            if (page.parentId === null) {
                                return (
                                    <li key={page._id}>
                                        <Page page={page} pageArr={data} />
                                    </li>
                                );
                            }
                        })
                    ) : (
                        <div className="flex flex-col gap-3 w-full px-5">
                            {new Array(4).fill("0").map((el) => (
                                <Skeleton
                                    key={Math.random() * 100}
                                    className="w-[80%] h-[20px]"
                                ></Skeleton>
                            ))}
                        </div>
                    )}
                    <div
                        className="flex justify-center cursor-pointer p-2 hover:bg-slate-800/20 gap-2 items-center text-slate-300 text-xs font-medium mt-2 hover:text-slate-300/70"
                        onClick={handleAddPage}
                    >
                        <Plus size={16} />
                        <span className="font-bold">Add page</span>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
