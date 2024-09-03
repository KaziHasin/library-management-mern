import { apiSlice } from "../apiSlice";
const BOOKS_URL = `/api/books`;

export const booksApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getBookList: build.query({
            query: ({ page, perPage, searchTerm }) => {
                const queryParams = `page=${page}&perPage=${perPage}&searchTerm=${searchTerm}`;
                return `${BOOKS_URL}?${queryParams}`;
            },
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
