import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'AIR_LOYALTY_ROLES';

export const loyaltyProgramPermissionsRoleAndRights = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getLoyaltyProgramRoleAndRightsPermissionsRoleList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getLoyaltyProgramRoleAndRightsSinglePermissionByProduct: builder?.query({
      query: ({ role }: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}/${role}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    addLoyaltyProgramRoleAndRightsSinglePermissionRole: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}`,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getLoyaltyProgramRoleAndRightsSinglePermissionRoleById: builder?.query({
      query: (roleId: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}/${roleId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    updateLoyaltyProgramRoleAndRightsSinglePermissionsRole: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}/${apiDataParameter?.pathParams?.roleId}`,
        method: 'PATCH',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteLoyaltyProgramRoleAndRightsSinglePermissionRole: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}/${apiDataParameter?.pathParams?.roleId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListQuery,
  useAddLoyaltyProgramRoleAndRightsSinglePermissionRoleMutation,
  useUpdateLoyaltyProgramRoleAndRightsSinglePermissionsRoleMutation,
  useDeleteLoyaltyProgramRoleAndRightsSinglePermissionRoleMutation,
  useGetLoyaltyProgramRoleAndRightsSinglePermissionByProductQuery,
  useGetLoyaltyProgramRoleAndRightsSinglePermissionRoleByIdQuery,
} = loyaltyProgramPermissionsRoleAndRights;
