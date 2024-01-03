import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const softwareUsers = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getSoftwareUsersDetails: builder?.query({
      query: (params: any) => ({
        url: `${END_POINTS?.GET_SOFTWARE_USER}`,
        method: 'GET',
        params,
      }),
      providesTags: ['GET-SOFTWARE-USERS-DETAILS'],
    }),
    getExportSoftwareUsers: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_SOFTWARE_USER}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: ['GET-SOFTWARE-USERS-DETAILS'],
    }),
  }),
});

export const {
  useGetSoftwareUsersDetailsQuery,
  useGetExportSoftwareUsersQuery,
} = softwareUsers;
