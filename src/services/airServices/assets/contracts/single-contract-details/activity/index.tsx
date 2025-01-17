import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

export const activityAPI = baseAPI.injectEndpoints({
  endpoints: (builder: any) => ({
    getSingleContractsActivityLog: builder.query({
      query: (getSingleContractActivityParameter: any) => ({
        url: END_POINTS?.ACTIVITY_LOG,
        method: 'GET',
        params: getSingleContractActivityParameter?.queryParams,
      }),
    }),
  }),
});

export const { useGetSingleContractsActivityLogQuery } = activityAPI;
