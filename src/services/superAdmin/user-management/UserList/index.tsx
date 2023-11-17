import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

export const userListApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUsersAccounts: builder.query({
      query: () => ({
        url: END_POINTS?.USER_ACCOUNTS_LIST,
        method: 'GET',
      }),
      providesTags: ['USERS'],
    }),

    getUserAccountsById: builder.query({
      query: ({ id }: any) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: ['USERS'],
    }),

    postUsersAccount: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.ADD_USER_ACCOUNT,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['USERS'],
    }),
    updateUsersAccount: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['USERS'],
    }),
    deleteUsers: builder.mutation({
      query: ({ id }: any) => ({
        url: `/${id}`,
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
