import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import CoverImage from "./CoverImage";
import QuillEditor from "./QuillEditor";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
    useGetPageQuery,
    useUpdatePageTitleMutation,
} from "@/redux/api/apiSlice";
import { useDebounce } from "usehooks-ts";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "react-router-dom";
import { setSelectedPageId } from "@/redux/slices/appSlice";
import { Input } from "@/components/ui/input";

const PageEditor = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = searchParams.get("pageId");

    const {
        isFetching,
        isLoading: isPageLoading,
        data = {},
        isSuccess,
        isError,
    } = useGetPageQuery(currentPage || "");
    const [updatePageTitle] = useUpdatePageTitleMutation();

    const [pageTitle, setPageTitle] = useState(data.title || "");
    const [isLoading, setisLoading] = useState(true);
    const debouncedValue = useDebounce(pageTitle, 700);

    const handleTitleChange = (e) => {
        setPageTitle(e.target.value);
    };

    useLayoutEffect(() => {
        setSelectedPageId(currentPage);
    }, []);

    useEffect(() => {
        if (isSuccess) {
            setPageTitle(data.title);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (data.title) {
            if (data.title === "Untitled") {
                setPageTitle("");
            } else {
                setPageTitle(data.title);
            }
        }
    }, [data.title]);

    useEffect(() => {
        setisLoading(true);
        setTimeout(() => {
            if (!isFetching) {
                setisLoading(false);
            }
        }, 400);
    }, [isFetching]);

    useEffect(() => {
        if (!isPageLoading) {
            updatePageTitle({ pageId: currentPage, title: pageTitle });
        }
    }, [debouncedValue]);

    return (
        <>
            {currentPage && !isLoading ? (
                <div className="flex-1 h-full  bg-slate-800/70">
                    <ScrollArea>
                        <div className="flex-1 h-[calc(100vh-70px)] pb-[40px]">
                            <CoverImage
                                pageId={currentPage}
                                imageUrl={data?.coverImage}
                            />
                            <div className=" px-4 md:px-10 mt-2">
                                <Input
                                    type="text"
                                    className={
                                        "bg-transparent outline-none border-none placeholder:font-bold text-2xl placeholder:text-slate-600/80 focus-visible:ring-0 focus-visible:shadow-none font-bold dark:text-slate-300 resize-none w-full whitespace-normal block text-wrap h-auto overflow-hidden"
                                    }
                                    placeholder="Untitled"
                                    disableFocus
                                    onChange={handleTitleChange}
                                    value={pageTitle}
                                />
                                <div className="relative mt-3 z-0">
                                    <QuillEditor
                                        content={data.content}
                                        pageId={data._id}
                                    />
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            ) : currentPage ? (
                <div className="flex flex-col flex-1 h-full bg-slate-800/70">
                    <div className="md:max-w-[600px] max-w-[350px] mx-auto w-full">
                        <Skeleton className="w-full h-[25px] mt-[140px] mb-16  rounded-none" />
                        <div className="space-y-2">
                            <Skeleton className="w-full h-[16px] rounded-none" />
                            <Skeleton className="w-full h-[16px] rounded-none" />
                            <Skeleton className="w-full h-[16px] rounded-none" />
                            <Skeleton className="w-full h-[120px] rounded-none" />
                        </div>
                    </div>
                </div>
            ) : (
                <h1 className="text-center text-2xl mt-[60px] flex-1">
                    Please Select the page
                </h1>
            )}
        </>
    );
};

export default PageEditor;
