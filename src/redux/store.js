import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice";
import { apiSlice } from "../services/api.js";

const store = configureStore({
    reducer: {
        todos: todosReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store