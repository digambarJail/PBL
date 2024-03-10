import { createSlice } from "@reduxjs/toolkit";
import { FaSadCry } from "react-icons/fa";

const initialState = {
    currentUser:null,
    error:null,
    loading:false
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInStart: (state) =>{
            state.loading = true
            state.error = null
        },
        signInSuccess: (state , action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;

        },
        signInFail: (state , action) => {
            state.loading = false;
            state.error = action.payload

        },
        signoutSuccess: (state) => {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
          },
    },


});

export const {signInStart , signInSuccess , signInFail , signoutSuccess} = UserSlice.actions

export default UserSlice.reducer;