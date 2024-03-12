import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'AIR_SERVICES_ROLES';

export const servicesPermissionsRole = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPermissionsRole: builder.query({
      query: (params: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    getPermissionsByProduct: builder.query({
      query: ({ productId }: any) => ({
        url: `${END_POINTS?.GET_PRODUCTS_PERMISSIONS}/${productId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    postPermissionsRole: builder?.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    getPermissionsRoleById: builder?.query({
      query: (roleId: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}/${roleId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    patchPermissionsRoleById: builder?.mutation({
      query: ({ updatedPatchData, roleId }: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}/${roleId}`,
        method: 'PATCH',
        body: updatedPatchData,
      }),
      invalidatesTags: [TAG],
    }),
    deleteRole: builder?.mutation({
      query: (roleId: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}/${roleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetPermissionsRoleQuery,
  useGetPermissionsByProductQuery,
  usePostPermissionsRoleMutation,
  useGetPermissionsRoleByIdQuery,
  usePatchPermissionsRoleByIdMutation,
  useDeleteRoleMutation,
} = servicesPermissionsRole;
