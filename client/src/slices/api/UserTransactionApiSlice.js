import { apiSlice } from "../apiSlice";
const TRANSACTION_URL = `/api/transactions/user-transaction`

export const UserTransactionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTransaction: builder.query({
            query: () => ({
                url: `${TRANSACTION_URL}`,
                method: "GET",
            }),
        })
    })
})

export const { useGetTransactionQuery } = UserTransactionApiSlice