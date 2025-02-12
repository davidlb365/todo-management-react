import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice";
import axios from "axios";

const store = configureStore({
    reducer: {
        todos: todosReducer
    }
})


    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        const token = store.getState().todos.authToken
        // const token = authToken
        // console.log(token)
        if(token) {
        config.headers['Authorization'] = token
        }
        return config;
        }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    })

export default store