import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const SmsMarketingAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSmsDashboardInsights: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.GET_SMS_DASHBOARD_INSIGHTS,
        method: 'GET',
        params: params,
      }),
      providesTags: ['DASHBOARD_INSIGHTS'],
    }),

    getSmsBroadcats: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.GET_SMS_MARKETING_BROADCAST,
        method: 'GET',
        params: params,
      }),
      providesTags: ['BROADCAST', 'DASHBOARD_INSIGHTS'],
    }),

    connectPhoneNumber: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.CONNECT_PHONE_NUMBER}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['CONNECT_PHONE_NUMBER'],
    }),

    deleteSmsBroadcast: builder.mutation({
      query: ({ ids }: any) => ({
        url: `${END_POINTS?.GET_SMS_MARKETING_BROADCAST}/${ids}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BROADCAST'],
    }),

    getIsPhoneConnected: builder.query({
      query: () => ({
        url: END_POINTS?.GET_IS_PHONE_CONNECTED,
        method: 'GET',
      }),
      providesTags: ['BROADCAST'],
    }),
  }),
});

export const {
  useGetSmsBroadcatsQuery,
  useDeleteSmsBroadcastMutation,
  useConnectPhoneNumberMutation,
  useGetIsPhoneConnectedQuery,
  useGetSmsDashboardInsightsQuery,
} = SmsMarketingAPI;
