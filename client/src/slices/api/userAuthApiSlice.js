import { apiSlice } from "../apiSlice";
const userAuthUrl = `/api/auth/user`;

export const userAuthApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        userLogin: builder.mutation({
            query: (data) => ({
                url: `${userAuthUrl}/login`,
                method: "POST",
                body: data,
            }),
        }),
        userLogout: builder.mutation({
            query: (data) => ({
                url: `${userAuthUrl}/logout`,
                method: "POST",
            }),
        }),
    }),
});

export const { useUserLoginMutation, useUserLogoutMutation } = userAuthApiSlice;