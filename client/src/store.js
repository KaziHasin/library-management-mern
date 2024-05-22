import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authProfileReducer from "./slices/authProfileSlice";
import authReducer from "./slices/authSlice";
import booksSlice from "./slices/booksSlice";
import messageReducer from "./slices/messageSlice";
import paginationHelperReducer from "./slices/paginationHelperSlice";
import userAuthReducer from "./slices/userAuthSlice";
import userReducer from "./slices/userSlice";
import userTransactionSlice from "./slices/userTransactionSlice";

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
    paginationHelperData: paginationHelperReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
