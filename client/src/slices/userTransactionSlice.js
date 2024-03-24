import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transactions: []
};

const userTransactionSlice = createSlice({
    name: "userTransaction",
    initialState,
    reducers: {
        setTransactions: (state, action) => {
            state.transactions = action.payload;
        }
    }

})

export const { setTransactions } = userTransactionSlice.actions;
export const selectUserTransactions = (state) => state.userTransactions.transactions;
export default userTransactionSlice.reducer;