import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedPage: null,
    connectedUsers: [],
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setSelectedPageId: (state, action) => {
            state.selectedPage = action.payload;
        },
        setConnectedUsers: (state, action) => {
            state.connectedUsers = action.payload;
        },
        removeDisconnectedUser: (state, action) => {
            state.connectedUsers = state.connectedUsers.filter(
                (u) => u.socketId !== action.payload
            );
        },
        clearUsers: (state, action) => {
            state.connectedUsers = [];
        },
    },
});

export const {
    setSelectedPageId,
    setConnectedUsers,
    removeDisconnectedUser,
    clearUsers,
} = appSlice.actions;

export const selectedPage = (state) => state.app.selectedPage;
export const getConnectedUsers = (state) => state.app.connectedUsers;

export default appSlice.reducer;
