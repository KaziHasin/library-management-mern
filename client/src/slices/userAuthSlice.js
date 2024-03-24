import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? localStorage.getItem('userInfo') : null,

};

const userAuthSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUserLogin: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
        },

        setUserLogout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo')

        },

    }

})

export const { setUserLogin, setUserLogout } = userAuthSlice.actions;

export default userAuthSlice.reducer;
