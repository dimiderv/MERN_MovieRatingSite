import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {setCredentials,logOut} from "../../features/auth/authSlice";


const BASE_URL = 'http://localhost:80';


const baseQuery = fetchBaseQuery({
    baseUrl:BASE_URL,
    credentials:'same-origin',
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

    if (result?.error?.originalStatus === 403){
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
            api.dispatch(logOut())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints:builder=>({})
})