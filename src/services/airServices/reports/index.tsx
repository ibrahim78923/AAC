import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const systematicReportsApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getServiceSystematicReports: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_SERVICES_SYSTEMATIC_REPORTS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
  }),
});

export const {
  useGetServiceSystematicReportsQuery,
  useLazyGetServiceSystematicReportsQuery,
} = systematicReportsApi;
