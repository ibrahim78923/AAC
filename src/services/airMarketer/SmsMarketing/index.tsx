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

    postSmsBroadcast: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.GET_SMS_MARKETING_BROADCAST,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['PERMISSIONS'],
    }),

    getSmsBroadcatsById: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.GET_SMS_MARKETING_BROADCAST}/${id}`,
        method: 'GET',
      }),
      providesTags: ['BROADCAST'],
    }),

    updateSmsBroadcats: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.GET_SMS_MARKETING_BROADCAST}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: ['BROADCAST'],
    }),
  }),
});

export const {
  useGetSmsBroadcatsQuery,
  useDeleteSmsBroadcastMutation,
  useConnectPhoneNumberMutation,
  useGetIsPhoneConnectedQuery,
  useGetSmsDashboardInsightsQuery,
  usePostSmsBroadcastMutation,
  useGetSmsBroadcatsByIdQuery,
  useUpdateSmsBroadcatsMutation,
} = SmsMarketingAPI;
