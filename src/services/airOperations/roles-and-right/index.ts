import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'AIR_OPERATIONS_ROLES';

export const operationsPermissionsRole = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPermissionsRoleForOperations: builder.query({
      query: (getRolesParameter: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}`,
        method: 'GET',
        params: getRolesParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getPermissionsByProductForOperations: builder.query({
      query: ({ role }: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}/${role}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    postPermissionsRoleForOperations: builder?.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    getPermissionsRoleByIdForOperations: builder?.query({
      query: (roleId: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}/${roleId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    patchPermissionsRoleByIdForOperations: builder?.mutation({
      query: ({ updatedPatchData, roleId }: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}/${roleId}`,
        method: 'PATCH',
        body: updatedPatchData,
      }),
      invalidatesTags: [TAG],
    }),
    deleteRoleForOperations: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}/${apiDataParameter?.pathParams?.roleId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLazyGetPermissionsRoleForOperationsQuery,
  useGetPermissionsByProductForOperationsQuery,
  usePostPermissionsRoleForOperationsMutation,
  useGetPermissionsRoleByIdForOperationsQuery,
  usePatchPermissionsRoleByIdForOperationsMutation,
  useDeleteRoleForOperationsMutation,
} = operationsPermissionsRole;
