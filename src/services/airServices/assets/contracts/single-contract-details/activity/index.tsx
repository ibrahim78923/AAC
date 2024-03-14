import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

const TAG = 'ACTIVITY_LOG';
export const activityAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getActivityLog: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.ACTIVITY_LOG,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useGetActivityLogQuery } = activityAPI;
