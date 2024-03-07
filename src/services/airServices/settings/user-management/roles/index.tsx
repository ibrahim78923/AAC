import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'AIR_SERVICES_ROLES';

export const servicesPermissionsRole = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPermissionsRole: builder.query({
      query: (params: any) => ({
        url: `${END_POINTS?.GET_PERMISSIONS_ROLES}`,
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
        url: `${END_POINTS?.GET_PERMISSIONS_ROLES}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetPermissionsRoleQuery,
  useGetPermissionsByProductQuery,
  usePostPermissionsRoleMutation,
} = servicesPermissionsRole;
