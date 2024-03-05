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
  }),
});

export const { useGetPermissionsRoleQuery } = servicesPermissionsRole;
