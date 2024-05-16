import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: null,
};

const messageSlice = createSlice({

    name: 'message',
    initialState,

    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        resetMessage: (state) => {
            state.message = null;
        }
    }

})

export const { setMessage, resetMessage } = messageSlice.actions;
export default messageSlice.reducer;