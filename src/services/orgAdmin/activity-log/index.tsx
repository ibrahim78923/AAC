import { ORG_ADMIN } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['ACTIVITY_LOG'];
export const ActivityLogAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getActivityLog: builder.query({
      query: ({ params }) => ({
        url: `${ORG_ADMIN.ACTIVITY_LOG}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
  }),
});

export const { useGetActivityLogQuery } = ActivityLogAPI;
