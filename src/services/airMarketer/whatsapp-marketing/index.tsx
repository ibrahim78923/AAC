import { WHATSAPP_MARKETING } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = ['WHATSAPP_BROADCAST'];
const DASHBOARD_TAG = ['WHATSAPP_BROADCAST', 'DASHBOARD_INSIGHTS'];

export const WhatsAppMarketingAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getWhatsAppBroadcats: builder.query({
      query: (params: any) => ({
        url: WHATSAPP_MARKETING?.GET_WHATSAPP_MARKETING_BROADCAST,
        method: 'GET',
        params: params,
      }),
      providesTags: DASHBOARD_TAG,
    }),

    connectPhoneNumber: builder.mutation({
      query: ({ body }: any) => ({
        url: `${WHATSAPP_MARKETING?.CONNECT_PHONE_NUMBER}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    getIsPhoneConnected: builder.query({
      query: () => ({
        url: WHATSAPP_MARKETING?.GET_IS_PHONE_CONNECTED,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    deleteWhatsAppBroadcast: builder.mutation({
      query: (id: any) => ({
        url: `${WHATSAPP_MARKETING?.GET_WHATSAPP_MARKETING_BROADCAST}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),

    postWhatsappBroadcast: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: WHATSAPP_MARKETING?.GET_WHATSAPP_MARKETING_BROADCAST,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),

    updateWhatsappBroadcast: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${WHATSAPP_MARKETING?.GET_WHATSAPP_MARKETING_BROADCAST}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),

    getWhatsappBroadcatsById: builder.query({
      query: (id: any) => ({
        url: `${WHATSAPP_MARKETING?.GET_WHATSAPP_MARKETING_BROADCAST}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
  }),
});

export const {
  useDeleteWhatsAppBroadcastMutation,
  useUpdateWhatsappBroadcastMutation,
  usePostWhatsappBroadcastMutation,
  useGetWhatsappBroadcatsByIdQuery,
  useConnectPhoneNumberMutation,
  useGetWhatsAppBroadcatsQuery,
  useGetIsPhoneConnectedQuery,
} = WhatsAppMarketingAPI;
