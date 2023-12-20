import { SOCIAL_FEATURES_CHAT } from '@/routesConstants/paths';
import { baseAPI } from '@/services/base-api';
const TAG = ['CHAT'];
export const chatApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUserChats: builder.query({
      query: ({ activeChatId, params }: any) => ({
        url: `${SOCIAL_FEATURES_CHAT.CHAT}${activeChatId}?page=1&limit=100`,
        method: 'GET',
        params: params,
        headers: {
          'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
        },
      }),
      providesTags: TAG,
    }),
    getChatsContacts: builder.query({
      query: ({ params }: any) => ({
        url: `${SOCIAL_FEATURES_CHAT.CHAT_LIST}?page=1&limit=10&isGroup=false`,
        method: 'GET',
        params: params,
        headers: {
          'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
        },
      }),
      providesTags: TAG,
    }),
  }),
});

export const { useGetUserChatsQuery, useGetChatsContactsQuery } = chatApi;
