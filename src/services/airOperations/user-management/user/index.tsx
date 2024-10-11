import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'USER_LIST';
const TAG_TEAM = 'TEAM_LIST';

const { PRODUCTS_USERS, OPERATIONS_TEAM, PERMISSIONS_ROLE } = END_POINTS ?? {};

export const operationsUsersManagementAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getOperationsUserManagementProductUserLists: builder?.query({
      query: (apiDataParameter: any) => ({
        url: PRODUCTS_USERS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getOperationsUserManagementSingleProductUserDetails: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${PRODUCTS_USERS}/${apiDataParameter?.pathParams?.id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    addOperationsUserManagementSingleProductUser: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: PRODUCTS_USERS,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    updateOperationsUserManagementSingleProductUser: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${PRODUCTS_USERS}/${apiDataParameter?.pathParams?.id}`,
        method: 'PATCH',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteOperationsUserManagementMultipleProductUsers: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: PRODUCTS_USERS,
        method: 'DELETE',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),

    getOperationsUserManagementTeamLists: builder?.query({
      query: (apiDataParameter: any) => ({
        url: OPERATIONS_TEAM,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG_TEAM],
    }),
    getOperationsUserManagementSingleTeamDetailsById: builder?.query({
      query: (id: any) => {
        return {
          url: `${OPERATIONS_TEAM}/${id}`,
          method: 'GET',
        };
      },
    }),
    addOperationsUserManagementSingleTeam: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: OPERATIONS_TEAM,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG_TEAM],
    }),
    updateOperationsUserManagementSingleTeam: builder.mutation({
      query: (apiDataParameter: any) => ({
        url: `${OPERATIONS_TEAM}/${apiDataParameter?.pathParams?.id}`,
        method: 'PATCH',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG_TEAM],
    }),
    deleteOperationsUserManagementSingleTeam: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: OPERATIONS_TEAM,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
    }),

    getOperationsUserManagementProductUsersListDropdown: builder?.query({
      query: ({ param }: any) => ({
        url: PRODUCTS_USERS,
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
    getOperationsUserManagementPermissionsRolesDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: PERMISSIONS_ROLE,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.companyaccountroles;
      },
      providesTags: [TAG],
    }),
    getOperationsUserManagementTeamsDropdown: builder?.query({
      query: ({ param }: any) => ({
        url: OPERATIONS_TEAM,
        method: 'GET',
        params: param,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.userTeams;
      },
    }),
  }),
});

export const {
  useLazyGetOperationsUserManagementProductUserListsQuery,
  useGetOperationsUserManagementSingleProductUserDetailsQuery,
  useAddOperationsUserManagementSingleProductUserMutation,
  useUpdateOperationsUserManagementSingleProductUserMutation,
  useDeleteOperationsUserManagementMultipleProductUsersMutation,
  useLazyGetOperationsUserManagementTeamListsQuery,
  useGetOperationsUserManagementSingleTeamDetailsByIdQuery,
  useAddOperationsUserManagementSingleTeamMutation,
  useUpdateOperationsUserManagementSingleTeamMutation,
  useDeleteOperationsUserManagementSingleTeamMutation,
  useLazyGetOperationsUserManagementProductUsersListDropdownQuery,
  useLazyGetOperationsUserManagementPermissionsRolesDropdownQuery,
  useLazyGetOperationsUserManagementTeamsDropdownQuery,
} = operationsUsersManagementAPI;
