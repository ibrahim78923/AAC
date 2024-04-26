import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

export const userListApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUsersAccounts: builder.query({
      query: ({ id, orgId, values }: any) => ({
        url: `${END_POINTS?.ADD_USER}/${id}${END_POINTS?.ORGANIZATION}/${orgId}${END_POINTS?.USER_ACCOUNT}`,
        method: 'GET',
        params: values,
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
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.ORG_ADMIN_EMP_LIST}/${id}${END_POINTS?.USER_ACCOUNT}`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['USERS'],
    }),

    postCompany: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.POST_COMPANY_ACCOUNT,
          method: 'POST',
          body: body,
          // headers: { 'Content-Type': 'multipart/form-data' },
        };
      },
      invalidatesTags: ['USERS'],
    }),

    postUserEmployee: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.ORG_ADMIN_EMP_LIST}/${id}`,
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

    updateUserImg: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.ADD_USER}/${id}/${END_POINTS?.USER_AVATAR}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: ['USERS'],
    }),

    updateAccountStatus: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.ADD_USER}${END_POINTS?.USER_ACCOUNT}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
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
  useLazyGetEmployeeListQuery,
  useGetUserAccountsByIdQuery,
  usePostUsersAccountMutation,
  usePostCompanyMutation,
  useUpdateUsersAccountMutation,
  useDeleteUsersMutation,
  usePostUserEmployeeMutation,
  useUpdateUserImgMutation,
  useUpdateAccountStatusMutation,
} = userListApi;
