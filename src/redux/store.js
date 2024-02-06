import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import apiSlice from "./api/apiSlice";
import appSlice from "./slices/appSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        app: appSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
