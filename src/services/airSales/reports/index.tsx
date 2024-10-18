import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['FORECAST', 'REPORTS'];

export const airSalesRolesAndRightsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDealsReorts: builder.query({
      query: (values: any) => ({
        url: END_POINTS?.DEALS_REPORTS,
        method: 'GET',
        params: values,
      }),
      providesTags: ['DEALS_REPORTS'],
    }),
    getPipelineForecastReport: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_PIPELINE_FORECAST_REPORT}`,
        method: 'GET',
        params: { ...params },
      }),
      providesTags: TAG,
    }),
    getCategoryForecastReport: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_CATEGORY_FORECAST_REPORT}`,
        method: 'GET',
        params: { ...params },
      }),
      providesTags: TAG,
    }),
  }),
});

export const {
  useGetDealsReortsQuery,
  useGetPipelineForecastReportQuery,
  useGetCategoryForecastReportQuery,
} = airSalesRolesAndRightsAPI;
