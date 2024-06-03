import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'AIR_LOYALTY_ROLES';

export const servicesPermissionsRole = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPermissionsRoleForLoyalty: builder.query({
      query: (getRolesParameter: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}`,
        method: 'GET',
        params: getRolesParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getPermissionsByProductForLoyalty: builder.query({
      query: ({ role }: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}/${role}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    postPermissionsRoleForLoyalty: builder?.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    getPermissionsRoleByIdForLoyalty: builder?.query({
      query: (roleId: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}/${roleId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    patchPermissionsRoleByIdForLoyalty: builder?.mutation({
      query: ({ updatedPatchData, roleId }: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}/${roleId}`,
        method: 'PATCH',
        body: updatedPatchData,
      }),
      invalidatesTags: [TAG],
    }),
    deleteRoleForLoyalty: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}/${apiDataParameter?.pathParams?.roleId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLazyGetPermissionsRoleForLoyaltyQuery,
  useGetPermissionsByProductForLoyaltyQuery,
  usePostPermissionsRoleForLoyaltyMutation,
  useGetPermissionsRoleByIdForLoyaltyQuery,
  usePatchPermissionsRoleByIdForLoyaltyMutation,
  useDeleteRoleForLoyaltyMutation,
} = servicesPermissionsRole;
