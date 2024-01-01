import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

export const activityAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getActivityLog: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.ACTIVITY_LOG,
        method: 'GET',
        params,
      }),
      providesTags: ['ACTIVITY_LOG'],
    }),
  }),
});

export const { useGetActivityLogQuery } = activityAPI;
