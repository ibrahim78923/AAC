import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'USER_LIST';

export const userManagementAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getProductUserList: builder?.query({
      query: ({ param }: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}`,
        method: 'GET',
        params: param,
      }),
      providesTags: [TAG],
    }),
    postProductUserList: builder?.mutation({
      query: (postAnnouncementParameter: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}`,
        method: 'POST',
        body: postAnnouncementParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getCompanyAccountsRoles: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.DROPDOWN_ACCOUNTS_ROLE,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: ['USERS'],
    }),
    getTeamUserList: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.SALES_TEAM}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.userTeams;
      },
      providesTags: [TAG],
    }),
    deleteProductUsers: builder?.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    patchProductUsers: builder.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    getTeamList: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.SALES_TEAM}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    deleteTeamUsers: builder?.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.SALES_TEAM}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetProductUserListQuery,
  usePostProductUserListMutation,
  useLazyGetCompanyAccountsRolesQuery,
  useLazyGetTeamUserListQuery,
  useDeleteProductUsersMutation,
  usePatchProductUsersMutation,
  useGetTeamListQuery,
  useDeleteTeamUsersMutation,
} = userManagementAPI;
