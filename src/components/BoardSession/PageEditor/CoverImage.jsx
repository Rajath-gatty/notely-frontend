import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdatePageCoverMutation } from "@/redux/api/apiSlice";
import { ImagePlus } from "lucide-react";
import React, { useRef } from "react";

const CoverImage = ({ imageUrl = null, pageId }) => {
    const inputFileRef = useRef(null);
    const [updatePageCover, { isSuccess, isError }] =
        useUpdatePageCoverMutation();

    const handleFileChange = (e) => {
        const inputFile = e.target.files[0];
        if (!inputFile) return;
        const formData = new FormData();
        formData.append("image", inputFile);
        formData.append("pageId", pageId);
        updatePageCover(formData);
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
                <img className="w-full h-[120px] object-cover" src={imageUrl} />
            )}
        </>
    );
};

export default CoverImage;
