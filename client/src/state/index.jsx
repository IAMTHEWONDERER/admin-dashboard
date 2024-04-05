import {createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode:  "dark"
};
export const globalSlice = createSlice({
    name : "global",
    initialState,
    reducers: {
        SetMode:(state)=>{
            state.mode = state.mode=== 'light' ? 'dark' : 'light';
        }
    }
})
export const {setMode}=globalSlice.actions;
export default globalSlice.reducer;