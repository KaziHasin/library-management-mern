import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminInfo: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo"))
    : null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },
    setLogout: (state, action) => {
      state.adminInfo = null;
      state.adminProfile = null;
      localStorage.removeItem("adminInfo");
    },

  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
