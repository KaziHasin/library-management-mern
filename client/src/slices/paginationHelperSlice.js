import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPages: 0,
    totalData: 0,
}

const paginationHelperSlice = createSlice({
    name: "helper",
    initialState,
    reducers: {
        setTotalPages: (state, action) => {
            state.totalPages = action.payload.totalPages;
        },
        setTotalData: (state, action) => {
            state.totalData = action.payload.totalData;
        },
    }

});

export const { setTotalPages, setTotalData } = paginationHelperSlice.actions;

export default paginationHelperSlice.reducer;