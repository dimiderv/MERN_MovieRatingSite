import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {logOut, setCredentials} from "../../features/auth/authSlice";


const BASE_URL = 'http://localhost:80';


const baseQuery = fetchBaseQuery({
    baseUrl:BASE_URL,
    credentials:'include',
    prepareHeaders: (headers, {getState})=>{
        const token = getState().auth.token;
        if(token){
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) =>{
    let result = await baseQuery(args,api,extraOptions);
    console.log(result)
    if (result?.error?.originalStatus === 403 || result?.error?.status === 403){
        console.log('sending refresh token');
        //send refresh toke to get new access token
        const refreshResult = await baseQuery('/refresh',api,extraOptions)
        console.log(refreshResult)
        if(refreshResult?.data){
            const user = api.getState().auth.username;
            api.dispatch(setCredentials({...refreshResult.data, user}));
            //retry the original query with new access token
            result = await baseQuery(args,api,extraOptions)
        }else {
            // if (refreshResult?.error?.status === 403) {
            //     refreshResult.error.data.message = "Your login has expired."
            // }
            // return refreshResult
            api.dispatch(logOut())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints:builder=>({})
})