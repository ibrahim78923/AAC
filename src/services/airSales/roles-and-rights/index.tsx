import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['PERMISSIONS'];
export const airSalesRolesAndRightsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPermissionsRoles: builder.query({
      query: (values: any) => ({
        url: END_POINTS?.GET_PERMISSIONS_ROLES,
        method: 'GET',
        params: values,
      }),
      providesTags: TAG,
    }),

    getPermissionsRolesById: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.GET_PLAN_PRODUCTS_PERMISSIONS}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    getRolesDataById: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.GET_PERMISSIONS_ROLES}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    getProductsPermissions: builder.query({
      query: ({ productId }: any) => ({
        url: `${END_POINTS?.GET_PRODUCTS_PERMISSIONS}/${productId}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    updateRoleRights: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.GET_PERMISSIONS_ROLES}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),

    postPermissionRole: builder.mutation({
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
  useGetPermissionsRolesQuery,
  useGetProductsPermissionsQuery,
  useUpdateRoleRightsMutation,
  useGetPermissionsRolesByIdQuery,
  useLazyGetPermissionsRolesByIdQuery,
  usePostPermissionRoleMutation,
  useGetRolesDataByIdQuery,
} = airSalesRolesAndRightsAPI;
