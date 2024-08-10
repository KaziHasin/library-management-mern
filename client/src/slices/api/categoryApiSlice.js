import { apiSlice } from "../apiSlice";

const CATEGORY_URL = "/api/categories/";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => CATEGORY_URL,
        }),
    }),
});

export const { useGetCategoriesQuery } = categoryApiSlice;
