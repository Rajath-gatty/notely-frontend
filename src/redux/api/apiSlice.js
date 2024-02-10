import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loginUser, logoutUser } from "../slices/authSlice";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import {
    clearUsers,
    removeDisconnectedUser,
    setConnectedUsers,
    setSelectedPageId,
} from "../slices/appSlice";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
let socket;

const getSocket = () => {
    if (!socket) {
        socket = io(SOCKET_URL);
    }
    return socket;
};

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include",
});

let refreshTokenPromise;

const baseQueryWithReAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
        if (!refreshTokenPromise) {
            refreshTokenPromise = baseQuery(
                "auth/refresh-token",
                api,
                extraOptions
            );
        }
        const res = await refreshTokenPromise;
        refreshTokenPromise = null;
        if (res?.data) {
            result = await baseQuery(args, api, extraOptions);
            api.dispatch(loginUser(res.data.data));
            Cookies.set("user", JSON.stringify(res.data.data), { expires: 7 });
            Cookies.set("isLoggedIn", true, { expires: 7 });
        } else {
            api.dispatch(logoutUser());
            window.location.reload();
        }
    }
    if (result?.error) {
        return result;
    } else {
        return result.data;
    }
};

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReAuth,
    tagTypes: ["BOARD"],
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (data) => ({
                url: "auth/sign-up",
                method: "POST",
                body: data,
            }),
        }),
        login: builder.mutation({
            query: (loginData) => ({
                url: "auth/login",
                method: "POST",
                body: loginData,
            }),
            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
                const data = await cacheDataLoaded;
                dispatch(loginUser(data.data));
            },
        }),
        googleLogin: builder.mutation({
            query: (loginData) => ({
                url: "auth/google/login",
                method: "POST",
                body: loginData,
            }),
            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
                const data = await cacheDataLoaded;
                dispatch(loginUser(data.data));
            },
        }),
        logout: builder.mutation({
            query: () => ({
                url: "auth/logout",
                method: "POST",
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(logoutUser());
            },
        }),
        getBoards: builder.query({
            query: () => "app/boards",
            providesTags: ["BOARD"],
            keepUnusedDataFor: 2,
        }),
        postBoard: builder.mutation({
            query: (data) => ({
                url: "app/create-board",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["BOARD"],
        }),
        getPages: builder.query({
            query: (boardId) => `app/${boardId}/pages`,
            keepUnusedDataFor: 0,
            async onCacheEntryAdded(
                boardId,
                {
                    updateCachedData,
                    cacheDataLoaded,
                    cacheEntryRemoved,
                    dispatch,
                    getState,
                }
            ) {
                try {
                    socket = getSocket();
                    if (!socket?.connected) socket.connect();
                    await cacheDataLoaded;
                    const { _id, name, avatar, cover, assignedColor } =
                        getState().auth.user;
                    const userData = {
                        _id,
                        name,
                        avatar,
                        cover,
                        assignedColor,
                        roomId: boardId,
                        cursorPos: null,
                    };
                    socket.emit("join", {
                        boardId,
                        userData,
                    });
                    socket.on("new-page", (data) => {
                        updateCachedData((draft) => {
                            const index = draft.findIndex(
                                (page) => page._id === data.parentId
                            );
                            if (index > 0) {
                                draft[index].childIds.push(data._id);
                            }
                            draft.push(data);
                        });
                    });
                    socket.on("delete-page", (pageId) => {
                        updateCachedData((draft) => {
                            const index = draft.findIndex(
                                (page) => page._id === pageId
                            );
                            if (draft[index].childIds.length > 0) {
                                draft[index].childIds.forEach((childId) => {
                                    const childIndex = draft.findIndex(
                                        (page) => page._id === childId
                                    );
                                    draft.splice(childIndex, 1);
                                });
                            }
                            if (draft[index]._id === pageId) {
                                dispatch(setSelectedPageId(null));
                                // Show toast notification if wanted
                            }
                            draft.splice(index, 1);
                        });
                    });
                    socket.on("title-update", (data) => {
                        updateCachedData((draft) => {
                            const index = draft.findIndex(
                                (page) => page._id === data.pageId
                            );
                            if (isNaN(index)) return;
                            draft[index].title = data.title;
                        });
                    });
                    socket.on("connected-users", (users) => {
                        const userId = getState().auth.user._id;
                        const connectedUsers = users.filter(
                            (u) => u._id !== userId
                        );
                        dispatch(setConnectedUsers(connectedUsers));
                    });

                    socket.on("disconnected-user", (id) => {
                        dispatch(removeDisconnectedUser(id));
                    });
                } catch (err) {}
                await cacheEntryRemoved;
                dispatch(clearUsers());
                socket.close();
            },
        }),
        postPage: builder.mutation({
            query: (data) => ({
                url: "app/create-page",
                method: "POST",
                body: data,
            }),
        }),
        deletePage: builder.mutation({
            query: (data) => ({
                url: "app/delete-page",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(setSelectedPageId(null));
            },
        }),
        getMessages: builder.query({
            query: (boardId) => ({
                url: "app/messages",
                method: "POST",
                body: { boardId },
            }),
            keepUnusedDataFor: 0,
            async onCacheEntryAdded(
                args,
                { cacheDataLoaded, updateCachedData, cacheEntryRemoved }
            ) {
                await cacheDataLoaded;
                try {
                    let socket = getSocket();
                    socket.on("message", (message) => {
                        updateCachedData((draft) => {
                            draft.push(message);
                        });
                    });
                } catch (err) {}
                await cacheEntryRemoved;
            },
        }),
        postMessages: builder.mutation({
            query: (data) => ({
                url: "app/post-message",
                method: "POST",
                body: data,
            }),
        }),
        getPage: builder.query({
            query: (pageId) => ({
                url: "app/page",
                method: "POST",
                body: { pageId },
            }),
            keepUnusedDataFor: 0,
            async onCacheEntryAdded(
                args,
                {
                    cacheDataLoaded,
                    dispatch,
                    getState,
                    updateCachedData,
                    cacheEntryRemoved,
                }
            ) {
                const {
                    data: { _id: pageId },
                } = await cacheDataLoaded;
                try {
                    let socket = getSocket();
                    socket.on("cover-update", (data) => {
                        updateCachedData((draft) => {
                            if (draft._id === data.pageId) {
                                draft.coverImage = data.coverImage;
                            }
                        });
                    });
                    socket.on("content-update", (data) => {
                        const currentUserId = getState().auth.user._id;
                        if (data.changedUserId === currentUserId) return;
                        updateCachedData((draft) => {
                            if (draft._id === data.pageId) {
                                draft.content = data.content;
                            }
                        });
                    });

                    socket.on("cursor-move", (data) => {
                        const connectedUsers = getState().app.connectedUsers;
                        let updatedConnectedUsers;
                        if (pageId !== data.pageId) {
                            updatedConnectedUsers = connectedUsers.map(
                                (user) => {
                                    if (user._id === data.cursorId) {
                                        return {
                                            ...user,
                                            cursorPos: null,
                                        };
                                    } else {
                                        return user;
                                    }
                                }
                            );
                            return dispatch(
                                setConnectedUsers(updatedConnectedUsers)
                            );
                        }
                        updatedConnectedUsers = connectedUsers.map((user) => {
                            if (user._id === data.cursorId) {
                                return {
                                    ...user,
                                    cursorPos: data.range,
                                };
                            } else {
                                return user;
                            }
                        });
                        dispatch(setConnectedUsers(updatedConnectedUsers));
                    });
                } catch (err) {}
                await cacheEntryRemoved;
                // dispatch(setSelectedPageId(null));
            },
        }),
        updatePageCover: builder.mutation({
            query: (data) => ({
                url: "app/page/update-cover",
                method: "POST",
                body: data,
            }),
        }),
        deletePageCover: builder.mutation({
            query: (data) => ({
                url: "app/page/delete-cover",
                method: "POST",
                body: data,
            }),
        }),
        updatePageTitle: builder.mutation({
            query: (data) => ({
                url: "app/page/update-title",
                method: "POST",
                body: data,
            }),
        }),
        updatePageContent: builder.mutation({
            query: (data) => ({
                url: "app/page/update-content",
                method: "POST",
                body: data,
            }),
        }),
        postCursorRange: builder.mutation({
            queryFn: (data) => {
                const socket = getSocket();
                return new Promise((resolve) =>
                    resolve(socket.emit("cursor-move-update", data))
                );
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useGoogleLoginMutation,
    useLogoutMutation,
    useSignupMutation,
    useGetBoardsQuery,
    usePostBoardMutation,
    useGetPagesQuery,
    usePostPageMutation,
    useDeletePageMutation,
    useGetMessagesQuery,
    usePostMessagesMutation,
    useGetPageQuery,
    useUpdatePageCoverMutation,
    useDeletePageCoverMutation,
    useUpdatePageTitleMutation,
    useUpdatePageContentMutation,
    usePostCursorRangeMutation,
} = apiSlice;

export default apiSlice;
