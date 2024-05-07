import { createSlice } from "@reduxjs/toolkit";


const authProfileSlice = createSlice({
    name: "authProfile",
    initialState: {
        adminProfile: null,
    },
    reducers: {
        setAdminProfile: (state, action) => {
            state.adminProfile = action.payload;

        }
    }
})


export const { setAdminProfile } = authProfileSlice.actions;
export default authProfileSlice.reducer;
