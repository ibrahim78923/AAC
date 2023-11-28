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
  }),
});

export const { useGetPermissionsRolesQuery } = rolesAndRightsAPI;
