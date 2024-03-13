import {createSlice} from "@reduxjs/toolkit";


const searchSlice = createSlice({
    name:'search',
    initialState:'',
    reducers:{
        setSearch : (state,action) => action.payload,
        clearSearch: state =>''
    }
});

export const {setSearch, clearSearch} = searchSlice.actions;
export const  selectSearchString = state => state.search
export  default searchSlice.reducer;