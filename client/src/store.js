import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./slices/messageSlice"
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import authProfileReducer from "./slices/authProfileSlice";
import userAuthReducer from "./slices/userAuthSlice";
import userTransactionSlice from "./slices/userTransactionSlice";
import booksSlice from "./slices/booksSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    message: messageReducer,
    user: userReducer,
    auth: authReducer,
    adminProfile: authProfileReducer,
    userAuth: userAuthReducer,
    userTransactions: userTransactionSlice,
    books: booksSlice,
    book: booksSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
