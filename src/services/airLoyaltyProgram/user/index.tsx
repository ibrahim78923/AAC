import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'USER_LIST';

const { PRODUCTS_USERS, PERMISSIONS_ROLE } = END_POINTS ?? {};

export const loyaltyProgramUsersAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getLoyaltyProgramUserManagementProductUserLists: builder?.query({
      query: (apiDataParameter: any) => ({
        url: PRODUCTS_USERS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getLoyaltyProgramUserManagementSingleProductUserDetails: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${PRODUCTS_USERS}/${apiDataParameter?.pathParams?.id}`,
        method: 'GET',
      }),
    }),
    addLoyaltyProgramUserManagementSingleProductUser: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: PRODUCTS_USERS,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    updateLoyaltyProgramUserManagementSingleProductUser: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${PRODUCTS_USERS}/${apiDataParameter?.pathParams?.id}`,
        method: 'PATCH',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteLoyaltyProgramUserManagementMultipleProductUsers: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: PRODUCTS_USERS,
        method: 'DELETE',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    verifyLoyaltyProgramUserManagementUserViaIg: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.AUTH_IG_VERIFICATION,
        method: 'POST',
        body: apiDataParameter?.email,
      }),
    }),
    getLoyaltyProgramUserManagementPermissionsRolesDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: PERMISSIONS_ROLE,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.companyaccountroles;
      },
    }),
  }),
});

export const {
  useLazyGetLoyaltyProgramUserManagementProductUserListsQuery,
  useGetLoyaltyProgramUserManagementSingleProductUserDetailsQuery,
  useAddLoyaltyProgramUserManagementSingleProductUserMutation,
  useUpdateLoyaltyProgramUserManagementSingleProductUserMutation,
  useDeleteLoyaltyProgramUserManagementMultipleProductUsersMutation,
  useLazyGetLoyaltyProgramUserManagementPermissionsRolesDropdownQuery,
  useVerifyLoyaltyProgramUserManagementUserViaIgMutation,
} = loyaltyProgramUsersAPI;
