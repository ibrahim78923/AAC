import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const rolesAndRightsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPermissionsRoles: builder.query({
      query: (values: any) => ({
        url: END_POINTS?.GET_PERMISSIONS_ROLES,
        method: 'GET',
        params: values,
      }),
      providesTags: ['PERMISSIONS'],
    }),

    getPermissionsRolesById: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.GET_PERMISSIONS_ROLES}/${id}`,
        method: 'GET',
      }),
      providesTags: ['PERMISSIONS'],
    }),

    getProductsPermissions: builder.query({
      query: ({ productId }: any) => ({
        url: `${END_POINTS?.GET_PRODUCTS_PERMISSIONS}/${productId}`,
        method: 'GET',
      }),
      providesTags: ['PERMISSIONS'],
    }),

    updateRoleRights: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.GET_PERMISSIONS_ROLES}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: ['PERMISSIONS'],
    }),

    postPermissionRole: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.GET_PERMISSIONS_ROLES,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['PERMISSIONS'],
    }),
  }),
});

export const {
  useGetPermissionsRolesQuery,
  useGetProductsPermissionsQuery,
  useUpdateRoleRightsMutation,
  useGetPermissionsRolesByIdQuery,
  useLazyGetPermissionsRolesByIdQuery,
  usePostPermissionRoleMutation,
} = rolesAndRightsAPI;
