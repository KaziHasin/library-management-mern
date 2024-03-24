import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import userAuthReducer from "./slices/userAuthSlice";
import userTransactionSlice from "./slices/userTransactionSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    userAuth: userAuthReducer,
    userTransactions: userTransactionSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
