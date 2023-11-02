import { baseAPI } from '@/services/base-api';
import { endpoints } from '@/routesConstants/endpoints';

export const userListApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUsersAccounts: builder.query({
      query: () => ({
        url: endpoints.USER_ACCOUNTS_LIST,
        method: 'GET',
      }),
      providesTags: ['USERS'],
    }),

    getUserAccountsById: builder.query({
      query: ({ id }: any) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
      providesTags: ['USERS'],
    }),

    postUsersAccount: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: endpoints?.ADD_USER_ACCOUNT,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['USERS'],
    }),
    updateUsersAccount: builder.mutation({
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
  useGetUsersAccountsQuery,
  useGetUserAccountsByIdQuery,
  usePostUsersAccountMutation,
  useUpdateUsersAccountMutation,
  useDeleteUsersMutation,
} = userListApi;
