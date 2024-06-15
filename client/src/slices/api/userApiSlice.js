import { apiSlice } from "../apiSlice";

export const USERS_URL = `/api/users`;

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page, perPage, searchTerm }) => {
        let queryParams = `page=${page}&perPage=${perPage}`;
        if (searchTerm) {
          queryParams += `&searchTerm=${searchTerm}`;
        }
        return `${USERS_URL}?${queryParams}`;
      },
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `${USERS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
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
