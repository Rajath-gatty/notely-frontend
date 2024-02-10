import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    useDeletePageCoverMutation,
    useUpdatePageCoverMutation,
} from "@/redux/api/apiSlice";
import { ImagePlus, MoreVertical, Trash } from "lucide-react";
import React, { useRef } from "react";
import { useParams } from "react-router-dom";

const CoverImage = ({ imageUrl = null, pageId }) => {
    const inputFileRef = useRef(null);
    const { boardId } = useParams();
    const [updatePageCover, { isLoading, isSuccess, isError }] =
        useUpdatePageCoverMutation();
    const [deletePageCover] = useDeletePageCoverMutation();

    const handleFileChange = (e) => {
        const inputFile = e.target.files[0];
        if (!inputFile) return;
        const formData = new FormData();
        formData.append("image", inputFile);
        formData.append("pageId", pageId);
        updatePageCover(formData);
    };

    const handleDeleteCover = () => {
        deletePageCover({
            boardId,
            pageId,
            imageUrl,
        });
    };

    return (
        <>
            {!imageUrl ? (
                <div className="h-full relative flex justify-center items-center max-h-[120px]">
                    <div
                        className="w-full h-full absolute inset-0 p-2"
                        type="fileInput"
                        id="fileInput"
                        onClick={() => inputFileRef.current.click()}
                    >
                        <div className="w-full h-full border border-slate-700 border-dashed flex items-center cursor-pointer justify-center gap-2">
                            <ImagePlus
                                className="text-center text-slate-500"
                                size={20}
                            />
                            <Label className="text-slate-500">Add Cover</Label>
                        </div>
                        <Input
                            type="file"
                            ref={inputFileRef}
                            className="hidden"
                            onChange={handleFileChange}
                            accept="image/png, image/gif, image/jpeg"
                        />
                    </div>
                </div>
            ) : (
                <div className="relative">
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="absolute top-1 right-1 p-1 rounded-md cursor-disabled bg-black/50 z-[30] eas transition-opacity cursor-pointer">
                                <MoreVertical size={18} color="#fff" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-[100px] dark:bg-slate-950 p-0  cursor-pointer">
                            <div
                                className="flex gap-2 items-center group justify-center hover:bg-slate-800 p-2"
                                onClick={handleDeleteCover}
                            >
                                <span className="text-[13px]">Delete</span>
                                <Trash size={18} />
                            </div>
                        </PopoverContent>
                    </Popover>
                    <img
                        className="w-full h-[120px] object-cover"
                        src={imageUrl}
                    />
                </div>
            )}
        </>
    );
};

export default CoverImage;
