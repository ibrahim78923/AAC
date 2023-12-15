import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

export const userListApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUsersAccounts: builder.query({
      query: (values: any) => ({
        url: `${END_POINTS?.ORG_ADMIN_EMP_LIST}/${values?.orgId}${END_POINTS?.USER_ACCOUNT}`,
        method: 'GET',
      }),
      providesTags: ['USERS'],
    }),

    getEmployeeList: builder.query({
      query: ({ orgId, values }: any) => ({
        url: `${END_POINTS?.ORG_ADMIN_EMP_LIST}/${orgId}`,
        method: 'GET',
        params: values,
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

    postUserEmployee: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.ORG_USER_EMPLOYEE}/${id}`,
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
  useGetEmployeeListQuery,
  useGetUserAccountsByIdQuery,
  usePostUsersAccountMutation,
  useUpdateUsersAccountMutation,
  useDeleteUsersMutation,
  usePostUserEmployeeMutation,
} = userListApi;
