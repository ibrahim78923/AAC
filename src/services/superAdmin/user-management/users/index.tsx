import { baseAPI } from '@/services/base-api';

export const usersApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: `/users}`,
        method: 'GET',
      }),
      providesTags: ['USERS'],
    }),
    getUsersById: builder.query({
      query: ({ id }: any) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
      providesTags: ['USERS'],
    }),
    postUsers: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `/users/${id}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['USERS'],
    }),
    updateUsers: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['USERS'],
    }),
    deleteUsers: builder.mutation({
      query: ({ id }: any) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
      invalidatesTags: ['USERS'],
    }),
  }),
});

export const {
  useUpdateUsersMutation,
  usePostUsersMutation,
  useGetUsersQuery,
  useDeleteUsersMutation,
  useGetUsersByIdQuery,
} = usersApi;
