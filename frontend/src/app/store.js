import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "./api/apiSlice";
import authReducer from '../features/auth/authSlice'
import searchReducer from '../features/search/searchSlice'
export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:authReducer,
        search: searchReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})