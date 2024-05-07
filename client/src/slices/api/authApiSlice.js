import { apiSlice } from "../apiSlice";
const AUTH_URL = `/api/auth`;

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/admin`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/admin/logout`,
        method: "POST",
      }),
    }),
    getProfile: builder.mutation({
      query: (id) => ({
        url: `${AUTH_URL}/admin/profile/${id}`,
        method: "GET",
      })
    }),
    updateProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `${AUTH_URL}/admin/profile/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    updateProfilePicture: builder.mutation({
      query: ({ id, data }) => ({
        url: `${AUTH_URL}/admin/profile/photo-update/${id}`,
        method: "PUT",
        body: data,
      })
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetProfileMutation, useUpdateProfileMutation, useUpdateProfilePictureMutation } = authApiSlice;
