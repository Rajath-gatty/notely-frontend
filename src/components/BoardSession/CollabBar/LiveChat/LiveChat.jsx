import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    useGetMessagesQuery,
    usePostMessagesMutation,
} from "@/redux/api/apiSlice";
import { useSelector } from "react-redux";
import { getCurrentUser } from "@/redux/slices/authSlice";
import { useParams } from "react-router-dom";

const LiveChat = () => {
    const { boardId } = useParams();
    const { isLoading, data = [], isError } = useGetMessagesQuery(boardId);
    const [postMessages, { isSuccess }] = usePostMessagesMutation();
    const user = useSelector(getCurrentUser);
    const scrollRef = useRef(null);

    const handleSubmitMessage = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const message = formData.get("messageInput");
        if (!message.trim()) return;
        if (!user?._id) return;
        const msg = {
            sender: user._id,
            message,
            boardId,
        };
        postMessages(msg);
        e.target.reset();
    };

    useEffect(() => {
        if (scrollRef?.current) {
            scrollRef.current.scrollIntoView();
        }
    });

    return (
        <div className="mx-2">
            <Card className=" dark:bg-slate-900 ">
                <h3 className="px-3 font-bold py-2">Live Chat</h3>
                <CardContent className="p-2">
                    <ScrollArea>
                        <div className="mt-4 min-h-[300px] max-h-[300px] pr-2">
                            {data.map((msg, i) => {
                                return (
                                    <div
                                        className="flex flex-col"
                                        ref={scrollRef}
                                        key={msg._id}
                                    >
                                        <Message
                                            message={msg.message}
                                            time={msg.createdAt}
                                            sent={msg.sender._id === user?._id}
                                            senderName={msg.sender.name}
                                            senderAvatar={msg.sender.avatar}
                                            showSenderProfile={
                                                msg.sender._id !==
                                                data[i - 1]?.sender._id
                                            }
                                            showSenderAvatar={
                                                msg.sender._id !==
                                                data[i + 1]?.sender._id
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea>
                    <Separator className="my-2" />
                    <form className="flex gap-1" onSubmit={handleSubmitMessage}>
                        <Input
                            className="bg-slate-800 text-xs"
                            placeholder="send message"
                            disableFocus
                            name="messageInput"
                        />
                        <Button className="text-xs" type="submit">
                            Send
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LiveChat;
