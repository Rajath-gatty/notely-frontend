import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Card, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import BoardNewCoverSelector from "./BoardNewCoverSelector";
import { Button } from "../ui/button";
import { usePostBoardMutation } from "@/redux/api/apiSlice";

const CreateBoard = ({ modalOpen, setModalOpen, setTierLimitReached }) => {
    const [unsplashImages, setUnsplashImages] = useState([]);

    const [boardTitle, setBoardTitle] = useState("");
    const [boardType, setBoardType] = useState("personal");
    const [selectedImageId, setSelectedImageId] = useState(null);
    const [file, setFile] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);

    const [postBoard, { isLoading, isSuccess, isError, error }] =
        usePostBoardMutation();

    useEffect(() => {
        if (boardTitle.trim().length >= 0 && boardType && selectedImageId) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [boardTitle, boardType, selectedImageId]);

    useEffect(() => {
        if (isSuccess) setModalOpen(false);
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            if (!error.data.errors.length) {
                setTierLimitReached(true);
            }
        }
    }, [isError]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let imageType;
        let selectedImage = file.find((f) => f?.id === selectedImageId);
        if (selectedImage) {
            imageType = "file";
        } else {
            selectedImage = unsplashImages.find(
                (img) => img.id === selectedImageId
            ).image.regular;
            imageType = "url";
        }

        if (!selectedImage) return;

        const formData = new FormData();
        formData.append("title", boardTitle);
        formData.append("imageType", imageType);
        formData.append("image", selectedImage);
        formData.append("boardType", boardType);
        postBoard(formData);
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <Label>Title</Label>
                <Input
                    className="dark:bg-slate-950/20"
                    type="text"
                    placeholder="Enter title"
                    value={boardTitle}
                    onChange={(e) => setBoardTitle(e.target.value)}
                    disableFocus
                />
                <div>
                    {isError && (
                        <p className="text-red-600 text-sm mt-2">
                            {error.data.errors[0]?.message}
                        </p>
                    )}
                </div>
            </div>
            <div>
                <Label>Board Type</Label>
                <Select value={boardType} onValueChange={setBoardType}>
                    <SelectTrigger className="dark:bg-slate-950/20">
                        <SelectValue placeholder="Select board type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="collaborative">
                            Collaborative
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label>Board Cover</Label>
                <Card className=" dark:bg-slate-950/20">
                    <CardContent className="p-0">
                        <ScrollArea className=" h-[150px]">
                            <div className="grid p-1 pr-3 w-full grid-cols-5 gap-1 justify-center items-center">
                                <BoardNewCoverSelector
                                    setSelectedImageId={setSelectedImageId}
                                    modalOpen={modalOpen}
                                    file={file}
                                    setFile={setFile}
                                    unsplashImages={unsplashImages}
                                    setUnsplashImages={setUnsplashImages}
                                />
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
            <div className="flex gap-4 w-full justify-end">
                <Button
                    onClick={() => setModalOpen(false)}
                    variant="outline"
                    className="dark:bg-slate-900"
                    type="reset"
                >
                    Cancel
                </Button>
                <Button disabled={isDisabled} type="submit">
                    {isLoading ? "Creating..." : "Create"}
                </Button>
            </div>
        </form>
    );
};

export default CreateBoard;
