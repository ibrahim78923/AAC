import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = ['PERMISSIONS'];

export const rolesAndRightsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPermissionsRolesOrgadmin: builder.query({
      query: (values: any) => ({
        url: END_POINTS?.GET_PERMISSIONS_ROLES,
        method: 'GET',
        params: values,
      }),
      providesTags: TAG,
    }),
    getPermissionsRolesByIdOrgadmin: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.GET_PERMISSIONS_ROLES}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    getProductsPermissionsOrgadmin: builder.query({
      query: ({ productId }: any) => ({
        url: `${END_POINTS?.GET_PLAN_PRODUCTS_PERMISSIONS}/${productId}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    updateRoleRightsOrgadmin: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.GET_PERMISSIONS_ROLES}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),
    postPermissionRoleOrgadmin: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.GET_PERMISSIONS_ROLES,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetPermissionsRolesOrgadminQuery,
  useGetProductsPermissionsOrgadminQuery,
  useGetPermissionsRolesByIdOrgadminQuery,
  useUpdateRoleRightsOrgadminMutation,
  usePostPermissionRoleOrgadminMutation,
  useLazyGetPermissionsRolesByIdOrgadminQuery,
  // useGetPermissionsRolesQuery,
  // useGetProductsPermissionsQuery,
  // useUpdateRoleRightsMutation,
  // useGetPermissionsRolesByIdQuery,
  // useLazyGetPermissionsRolesByIdQuery,
  // usePostPermissionRoleMutation,
} = rolesAndRightsAPI;
