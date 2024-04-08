import { createSlice } from "@reduxjs/toolkit";

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
          updateSuccess: (state, action) => {
            state.currentUser.data.user = action.payload;
            state.loading = false;
            state.error = null;
          },
          updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
          reset: () => initialState
        }
      });

export const {signInStart , signInSuccess , signInFail , signoutSuccess ,updateSuccess ,updateFailure, reset } = UserSlice.actions

export default UserSlice.reducer;