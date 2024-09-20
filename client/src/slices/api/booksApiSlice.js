import { apiSlice } from "../apiSlice";
const BOOKS_URL = `/api/books`;

export const booksApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBookList: builder.query({
            query: ({ page, perPage, searchTerm }) => {
                const queryParams = `page=${page}&perPage=${perPage}&searchTerm=${searchTerm}`;
                return `${BOOKS_URL}?${queryParams}`;
            },
        }),

        getBookById: builder.mutation({
            query: (id) => ({
                url: `${BOOKS_URL}/${id}`,
                method: "GET",
            }),
        }),
        createBook: builder.mutation({
            query: (data) => ({
                url: `${BOOKS_URL}`,
                method: "POST",
                body: data,
            }),
        }),
        updateBook: builder.mutation({
            query: ({ id, data }) => ({
                url: `${BOOKS_URL}/${id}`,
                method: "PUT",
                body: data,
            }),
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `${BOOKS_URL}/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetBookListQuery,
    useGetBookByIdMutation,
    useCreateBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
} = booksApiSlice;
