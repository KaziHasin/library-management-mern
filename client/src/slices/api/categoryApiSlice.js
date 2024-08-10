import { apiSlice } from "../apiSlice";

const CATEGORY_URL = 'http://localhost:4000/api/categories/'

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => CATEGORY_URL,
        }),
    }),
});

export const {
    useGetCategoriesQuery
} = categoryApiSlice;