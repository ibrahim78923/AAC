import { baseAPI } from '@/services/base-api';
import { AIR_MARKETER } from '@/routesConstants/endpoints';

const TAG = ['REPORTS_LEADS'];
export const reportLeadsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getLeadsReportStats: builder.query({
      query: ({ params }) => ({
        url: AIR_MARKETER?.REPORTS_LEADS,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
  }),
});

export const { useGetLeadsReportStatsQuery } = reportLeadsAPI;
