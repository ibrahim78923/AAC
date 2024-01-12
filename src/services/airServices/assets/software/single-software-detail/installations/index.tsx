import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'SOFTWARE_INSTALLATION';

export const InstallationAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getInstallationById: builder?.query({
      query: (params: any) => ({
        url: `${END_POINTS?.SOFTWARE_INSTALLATION}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    getExportInstallation: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.SOFTWARE_INSTALLATION}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
      providesTags: [TAG],
    }),
  }),
});
export const {
  useLazyGetInstallationByIdQuery,
  useLazyGetExportInstallationQuery,
} = InstallationAPI;
