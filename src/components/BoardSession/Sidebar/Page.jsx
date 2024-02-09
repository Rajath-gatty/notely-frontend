import { cn } from "@/lib/utils";
import {
    useDeletePageMutation,
    usePostPageMutation,
} from "@/redux/api/apiSlice";
import { selectedPage, setSelectedPageId } from "@/redux/slices/appSlice";
import { ChevronRight, File, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Page = ({ page, pageArr, setIsCollapsed, isMobile = false }) => {
    const dispatch = useDispatch();
    const { boardId } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [postPage, { isError }] = usePostPageMutation();

    const isPageSelected = useSelector(
        (state) => selectedPage(state) === page._id
    );
    const [deletePage, { isSuccess }] = useDeletePageMutation();

    useEffect(() => {
        if (!page.parentId) {
            setIsOpen(true);
        }
    }, []);

    const handleToggleFolder = (e) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    };

    const handleNewPage = (e) => {
        e.stopPropagation();
        const newPage = {
            title: "Untitled",
            parentId: page._id,
            boardId,
        };
        setIsOpen(true);
        postPage(newPage);
    };

    const handleFileSelect = () => {
        if (isMobile) {
            setIsCollapsed((prev) => !prev);
        }
        dispatch(setSelectedPageId(page._id));
    };

    const handleDeleteFile = (e) => {
        e.stopPropagation();
        deletePage({ pageId: page._id, childIds: page.childIds, boardId });
    };
    return (
        <>
            <div
                className={cn(
                    "py-2 px-4 group/item hover:text-slate-500 text-slate-400 cursor-pointer font-bold flex gap-2 items-center justify-between relative",
                    isPageSelected &&
                        "bg-indigo-950/40 text-indigo-400 hover:text-indigo-400"
                )}
                onClick={handleFileSelect}
            >
                <div className="flex gap-2 items-center overflow-hidden w-full">
                    <div className="w-[15px]">
                        <ChevronRight
                            size={15}
                            className={cn(
                                "font-bold",
                                isOpen ? "rotate-90" : "rotate-0"
                            )}
                            onClick={handleToggleFolder}
                        />
                    </div>
                    <div className="flex items-center gap-1 w-full">
                        <File size={15} />
                        <p
                            className={
                                "whitespace-nowrap text-ellipsis overflow-hidden select-none text-[13px] pr-6"
                            }
                        >
                            {page.title}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 items-center invisible group/item group-hover/item:visible absolute right-2 dark:bg-slate-900">
                    <Plus size={18} onClick={handleNewPage} />
                    <Trash2 size={15} onClick={handleDeleteFile} />
                </div>
            </div>
            {page.childIds.length > 0 && isOpen && (
                <ul className="ml-4">
                    {page.childIds.map((childId) => {
                        const item = pageArr.find((i) => i._id === childId);
                        return (
                            <li key={item._id}>
                                <Page page={item} pageArr={pageArr} />
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
};

export default Page;
