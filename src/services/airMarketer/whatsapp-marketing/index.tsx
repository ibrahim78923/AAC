import { WHATSAPP_MARKETING } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const WhatsAppMarketingAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getWhatsAppBroadcats: builder.query({
      query: (params: any) => ({
        url: WHATSAPP_MARKETING?.GET_WHATSAPP_MARKETING_BROADCAST,
        method: 'GET',
        params: params,
      }),
      providesTags: ['BROADCAST', 'DASHBOARD_INSIGHTS'],
    }),

    connectPhoneNumber: builder.mutation({
      query: ({ body }: any) => ({
        url: `${WHATSAPP_MARKETING?.CONNECT_PHONE_NUMBER}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['WHATSAPP_BROADCAST'],
    }),

    getIsPhoneConnected: builder.query({
      query: () => ({
        url: WHATSAPP_MARKETING?.GET_IS_PHONE_CONNECTED,
        method: 'GET',
      }),
      providesTags: ['WHATSAPP_BROADCAST'],
    }),
  }),
});

export const {
  useGetWhatsAppBroadcatsQuery,
  useConnectPhoneNumberMutation,
  useGetIsPhoneConnectedQuery,
} = WhatsAppMarketingAPI;
