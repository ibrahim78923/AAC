import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'USER_LIST';

export const userManagementAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getProductUserList: builder?.query({
      query: ({ param }: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}`,
        method: 'GET',
        params: param,
      }),
      providesTags: [TAG],
    }),
    getProductUserListDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
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
      query: (deleteId: any) => ({
        url: `${END_POINTS?.SALES_TEAM}/${deleteId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAG],
    }),
    postCreateTeam: builder?.mutation({
      query: (postAnnouncementParameter: any) => ({
        url: `${END_POINTS?.SALES_TEAM}`,
        method: 'POST',
        body: postAnnouncementParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getViewProductUsers: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}${id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    patchTeamUsers: builder.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.SALES_TEAM}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetProductUserListQuery,
  useLazyGetProductUserListDropdownQuery,
  usePostProductUserListMutation,
  useLazyGetCompanyAccountsRolesQuery,
  useLazyGetTeamUserListQuery,
  useDeleteProductUsersMutation,
  usePatchProductUsersMutation,
  useGetTeamListQuery,
  useDeleteTeamUsersMutation,
  usePostCreateTeamMutation,
  useGetViewProductUsersQuery,
  usePatchTeamUsersMutation,
} = userManagementAPI;
