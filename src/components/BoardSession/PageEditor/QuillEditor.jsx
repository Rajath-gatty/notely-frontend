import { useCallback, useEffect, useState, useRef } from "react";
import "./QuillEditor.css";
import {
    usePostCursorRangeMutation,
    useUpdatePageContentMutation,
} from "@/redux/api/apiSlice";
import { useSelector } from "react-redux";
import { getConnectedUsers } from "@/redux/slices/appSlice";
import { getCurrentUser } from "@/redux/slices/authSlice";
import { useParams } from "react-router-dom";

const QuillEditor = ({ content = "", pageId }) => {
    const [quill, setQuill] = useState(null);
    const [updatePageContent] = useUpdatePageContentMutation();
    const [postCursorRange] = usePostCursorRangeMutation();
    const connectedUsers = useSelector(getConnectedUsers);
    const currentUser = useSelector(getCurrentUser);
    const timeoutRef = useRef(null);
    const [cursors, setCursors] = useState([]);

    const { boardId } = useParams();

    const toolbar = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
        [{ font: [] }],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        [{ color: [] }, { background: [] }],
        ["link", "image"],
        ["clean"],
    ];

    useEffect(() => {
        if (quill === null) return;
        quill.setContents(!content ? "" : JSON.parse(content));
    }, [quill, content]);

    useEffect(() => {
        if (quill === null) return;
        const selectionHandler = (cursorId) => {
            return (range, oldRange, source) => {
                if (source === "user" && cursorId) {
                    postCursorRange({ range, pageId, cursorId, boardId });
                }
            };
        };

        const quillHandler = (delta, oldDelta, source) => {
            if (source !== "user") return;

            quill.updateContents(JSON.stringify(delta));
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                const range = quill.getSelection();
                postCursorRange({
                    range,
                    pageId,
                    cursorId: currentUser._id,
                    boardId,
                });
                updatePageContent({
                    content: JSON.stringify(quill.getContents()),
                    pageId,
                });
            }, 900);
        };

        quill.on("text-change", quillHandler);
        quill.on("selection-change", selectionHandler(currentUser._id));

        () => {
            quill.off("text-change", quillHandler);
            quill.off("selection-change", selectionHandler);
            if (timeoutRef.current) return clearTimeout(timeoutRef.current);
        };
    }, [quill]);

    useEffect(() => {
        if (quill === null) return;
        let localCursors = [];
        // console.log(connectedUsers);
        connectedUsers.forEach((user) => {
            if (user._id !== currentUser._id) {
                const userCursor = quill.getModule("cursors");
                userCursor.createCursor(
                    user._id,
                    user.name,
                    user.assignedColor
                );
                localCursors.push(userCursor);
            }
        });
        setCursors(localCursors);
    }, [quill, connectedUsers]);

    useEffect(() => {
        if (quill === null || connectedUsers.length !== cursors.length) return;
        console.log("executing cursor");
        connectedUsers.forEach((user, i) => {
            cursors[i].moveCursor(user._id, user.cursorPos);
        });
        // Listen for the cursor move socket event
    }, [quill, connectedUsers, connectedUsers.length]);

    const quillWrapper = useCallback(async (wrapper) => {
        if (!wrapper) return;
        wrapper.innerHTML = "";
        const editor = document.createElement("div");
        wrapper.append(editor);
        const Quill = (await import("quill")).default;
        const QuillCursors = (await import("quill-cursors")).default;
        Quill.register("modules/cursors", QuillCursors);
        const q = new Quill(editor, {
            theme: "snow",
            modules: {
                toolbar,
                cursors: {
                    transformOnTextChange: true,
                },
            },
        });
        setQuill(q);
    }, []);

    return (
        <div ref={quillWrapper} className="w-full h-[initial]">
            QuillEditor
        </div>
    );
};

export default QuillEditor;
