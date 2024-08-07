import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const rolesAndRightsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAdminRolesAndRights: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.GET_ADMIN_PERMISSIONS_ROLES,
        method: 'GET',
        params: params,
      }),
      providesTags: ['PERMISSIONS'],
    }),

    getAdminProductsPermissionsById: builder.query({
      query: ({ productId }: any) => ({
        url: `${END_POINTS?.GET_PRODUCTS_PERMISSIONS}/${productId}`,
        method: 'GET',
      }),
      providesTags: ['PERMISSIONS'],
    }),
  }),
});

export const {
  useGetAdminProductsPermissionsByIdQuery,
  useGetAdminRolesAndRightsQuery,
} = rolesAndRightsApi;
