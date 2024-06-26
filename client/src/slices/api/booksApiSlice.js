import { apiSlice } from "../apiSlice";
const BOOKS_URL = `/api/books`

export const booksApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getBookList: build.query({
            query: () => BOOKS_URL,
        }),

        getBookById: build.mutation({
            query: (id) => ({
                url: `${BOOKS_URL}/${id}`,
                method: "GET",
            }),
        }),
    })

})

export const {
    useGetBookListQuery,
    useGetBookByIdMutation
} = booksApiSlice;