import { ORG_ADMIN } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const ContactActivityLogAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getContactActivityLog: builder.query({
      query: ({ params }) => ({
        url: `${ORG_ADMIN.ACTIVITY_LOG}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['ACTIVITY_LOG'],
    }),

    getContactSubActivityLog: builder.query({
      query: ({ params }) => ({
        url: `${ORG_ADMIN.ACTIVITY_LOG_SUB}`,
        method: 'GET',
        params: params,
      }),
      providesTags: (result = { data: { activitylogs: [] } }) => {
        const activityLogs: { _id: string }[] =
          result?.data?.activitylogs || [];
        return [
          ...activityLogs.map(
            ({ _id }) => ({ type: 'ACTIVITY_LOG', id: _id }) as const,
          ),
          { type: 'ACTIVITY_LOG' as const, id: 'LIST' },
        ];
      },
    }),
  }),
});

export const {
  useGetContactActivityLogQuery,
  useGetContactSubActivityLogQuery,
} = ContactActivityLogAPI;
