import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: 1,
    sort:"",
    activeTab:"Blogs",
}
const sortSlice = createSlice({
    name:"sort",
    initialState,
    reducers:{
        setSort: (state, action) => {
            state.sort = action.payload;
          },
        setPage: (state, action) => {
            state.page = action.payload;
          },
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
          },
    }
});
export const {setSort,setPage,setActiveTab } = sortSlice.actions

export default sortSlice.reducer;