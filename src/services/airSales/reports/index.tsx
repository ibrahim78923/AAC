import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

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
  }),
});

export const { useGetDealsReortsQuery } = airSalesRolesAndRightsAPI;
