import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const SMS_MARKETING = ['DASHBOARD_INSIGHTS', 'BROADCAST'];
export const SmsMarketingAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSmsDashboardInsights: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.GET_SMS_DASHBOARD_INSIGHTS,
        method: 'GET',
        params: params,
      }),
      providesTags: SMS_MARKETING,
    }),

    getSmsBroadcats: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.GET_SMS_MARKETING_BROADCAST,
        method: 'GET',
        params: params,
      }),
      providesTags: SMS_MARKETING,
    }),

    connectPhoneNumberForSmsMarketing: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.CONNECT_PHONE_NUMBER}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['CONNECT_PHONE_NUMBER'],
    }),

    deleteSmsBroadcast: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.DELETE_SMS_MARKETING_BROADCAST}`,
        method: 'DELETE',
        body: body,
      }),
      invalidatesTags: SMS_MARKETING,
    }),

    getIsPhoneConnectedForSmsMarketing: builder.query({
      query: () => ({
        url: END_POINTS?.GET_IS_PHONE_CONNECTED,
        method: 'GET',
      }),
      providesTags: SMS_MARKETING,
    }),

    postSmsBroadcast: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.GET_SMS_MARKETING_BROADCAST,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: SMS_MARKETING,
    }),

    getSmsBroadcatsById: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.GET_SMS_MARKETING_BROADCAST}/${id}`,
        method: 'GET',
      }),
      providesTags: SMS_MARKETING,
    }),

    updateSmsBroadcast: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.GET_SMS_MARKETING_BROADCAST}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: SMS_MARKETING,
    }),
  }),
});

export const {
  useGetSmsBroadcatsQuery,
  useDeleteSmsBroadcastMutation,
  useConnectPhoneNumberForSmsMarketingMutation,
  useGetIsPhoneConnectedForSmsMarketingQuery,
  useGetSmsDashboardInsightsQuery,
  usePostSmsBroadcastMutation,
  useGetSmsBroadcatsByIdQuery,
  useUpdateSmsBroadcastMutation,
} = SmsMarketingAPI;
