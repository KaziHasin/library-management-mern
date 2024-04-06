import { apiSlice } from "../apiSlice";

export const USERS_URL = `/api/users`;

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => USERS_URL,
    }),
    register: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: build.mutation({
      query: ({ id, data }) => ({
        url: `${USERS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useRegisterMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
