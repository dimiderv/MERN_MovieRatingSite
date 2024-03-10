import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState: {username: null, token:null},
    reducers: {
        setCredentials:(state, action)=>{
            const {username, token} = action.payload;
            state.username = username
            state.token = token
        },
        logOut:(state,action)=> {
            state.username = null;
            state.token = null;
        }
    }
})

export const {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.username
export const selectCurrentToken = (state)=>state.auth.token;