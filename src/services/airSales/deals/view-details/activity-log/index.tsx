import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const ActivityLogAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getActivityLog: builder.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.ACTIVITY_LOG}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['DEALS_ACTIVITY_LOG'],
    }),
  }),
});

export const { useGetActivityLogQuery } = ActivityLogAPI;
