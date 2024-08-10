import { apiSlice } from "../apiSlice";
const BOOKS_URL = `/api/books`;

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
        createBook: build.mutation({
            query: (data) => ({
                url: `${BOOKS_URL}`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetBookListQuery,
    useGetBookByIdMutation,
    useCreateBookMutation,
} = booksApiSlice;
