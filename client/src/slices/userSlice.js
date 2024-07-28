import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  successMessage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateStoreUser: (state, action) => {
      const { id, updatedUser } = action.payload;
      const index = state.users.findIndex((user) => user._id === id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    },
    deleteStoreUser: (state, action) => {
      const { id } = action.payload;
      state.users = state.users.filter((user) => user._id !== id);
    },
    resetUsers: (state) => {
      state.users = [];
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
      console.log("User slice success", state.successMessage);
    },
  },
});

export const {
  addUser,
  updateStoreUser,
  deleteStoreUser,
  resetUsers,
  setSuccessMessage,
} = userSlice.actions;
export const selectUsers = (state) => state.user.users;
export const selectUserById = (state, userId) =>
  state.user.users.find((user) => user._id === userId);
export const selectSuccessMessage = (state) => state.user.successMessage;
export default userSlice.reducer;
