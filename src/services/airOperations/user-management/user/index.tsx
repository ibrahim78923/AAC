import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'USER_LIST';
const TAG_TEAM = 'TEAM_LIST';

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
    getProductUserDropdown: builder?.query({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}/${id}`,
        method: 'GET',
        body,
      }),
      providesTags: [TAG],
    }),
    getProductTeamUserListDropdown: builder?.query({
      query: ({ param }: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}`,
        method: 'GET',
        params: param,
      }),
      transformResponse: (response: any) => {
        if (response && response?.data && response?.data?.usercompanyaccounts) {
          return response?.data?.usercompanyaccounts.map((item: any) => ({
            ...item,
          }));
        }
        return [];
      },
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
    getTeamUserList: builder?.query({
      query: ({ param }: any) => ({
        url: `${END_POINTS?.SALES_TEAM}`,
        method: 'GET',
        params: param,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.userTeams;
      },
      providesTags: [TAG_TEAM],
    }),
    patchProductUsers: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    getTeamList: builder?.query({
      query: ({ param }: any) => ({
        url: `${END_POINTS?.SALES_TEAM}`,
        method: 'GET',
        params: param,
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
        url: `${END_POINTS?.PRODUCTS_USERS}/${id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    patchTeamUsers: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.SALES_TEAM}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    getTeamsById: builder.query({
      query: (id: any) => {
        return {
          url: `${END_POINTS?.SALES_TEAM}/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['TEAMS'],
    }),
    getProductUserListForOperation: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getSingleProductUserDetailForOperation: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}/${apiDataParameter?.pathParams?.id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    addProductUserForOperation: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}`,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteProductUsers: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}`,
        method: 'DELETE',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    updateProductUserForOperation: builder.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}/${apiDataParameter?.pathParams?.id}`,
        method: 'PATCH',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getPermissionsRoleForUpsertOperationUser: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.companyaccountroles;
      },
      providesTags: [TAG],
    }),
    getTeamDropdownForOperationUserList: builder?.query({
      query: ({ param }: any) => ({
        url: `${END_POINTS?.SALES_TEAM}`,
        method: 'GET',
        params: param,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.userteams;
      },
    }),
    getTeamListForOperation: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.SALES_TEAM}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getTeamsByIdForOperation: builder.query({
      query: (id: any) => {
        return {
          url: `${END_POINTS?.SALES_TEAM}/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['TEAMS'],
    }),
    patchTeamUsersForOperation: builder.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.SALES_TEAM}/${apiDataParameter?.pathParams?.id}`,
        method: 'PATCH',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    postCreateTeamForOperation: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.SALES_TEAM}`,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetProductUserListQuery,
  useLazyGetProductUserListDropdownQuery,
  useGetProductUserDropdownQuery,
  usePostProductUserListMutation,
  useLazyGetTeamUserListQuery,
  usePatchProductUsersMutation,
  useGetTeamListQuery,
  useLazyGetTeamListQuery,
  useDeleteTeamUsersMutation,
  usePostCreateTeamMutation,
  useGetViewProductUsersQuery,
  usePatchTeamUsersMutation,
  useLazyGetTeamsByIdQuery,
  useLazyGetProductTeamUserListDropdownQuery,
  useLazyGetProductUserDropdownQuery,
  useLazyGetViewProductUsersQuery,
  useLazyGetProductUserListForOperationQuery,
  useGetProductUserListForOperationQuery,
  useAddProductUserForOperationMutation,
  useDeleteProductUsersMutation,
  useUpdateProductUserForOperationMutation,
  useLazyGetPermissionsRoleForUpsertOperationUserQuery,
  useGetSingleProductUserDetailForOperationQuery,
  useLazyGetTeamDropdownForOperationUserListQuery,
  useLazyGetTeamListForOperationQuery,
  useGetTeamsByIdForOperationQuery,
  usePostCreateTeamForOperationMutation,
  usePatchTeamUsersForOperationMutation,
} = userManagementAPI;
