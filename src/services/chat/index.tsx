import { SOCIAL_FEATURES_CHAT } from '@/routesConstants/paths';
import { baseAPI } from '@/services/base-api';
const TAG = ['CHAT'];
export const chatApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUserChats: builder.query({
      query: ({ activeChatId, params, limit, isGroup }: any) => ({
        url: `${SOCIAL_FEATURES_CHAT?.CHAT}${activeChatId}?page=1&limit=${
          limit ?? 1000
        }&isGroup=${isGroup}`,
        method: 'GET',
        params: params,
        headers: {
          'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
        },
      }),
      providesTags: TAG,
    }),
    getUserChatsInfo: builder.query({
      query: ({ activeChatId, params, limit, isGroup, mediaType }: any) => ({
        url: `${SOCIAL_FEATURES_CHAT?.CHAT}${activeChatId}?page=1&limit=${
          limit ?? 1000
        }&isGroup=${isGroup}&mediaType=${mediaType}`,
        method: 'GET',
        params: params,
        headers: {
          'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
        },
      }),
      providesTags: TAG,
    }),
    getChatsContacts: builder.query({
      query: ({ params, isGroup, query }: any) => ({
        url: `${SOCIAL_FEATURES_CHAT?.CHAT_LIST}?page=1&limit=10&isGroup=${isGroup}${query}`,
        method: 'GET',
        params: params,
        headers: {
          'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
        },
      }),
      providesTags: TAG,
    }),
    updateChat: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_CHAT?.UPDATE_CHAT}${id}`,
          method: 'PATCH',
          body: body,
          headers: {
            'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
          },
        };
      },
      invalidatesTags: TAG,
    }),
    chatAttachmentUpload: builder.mutation({
      query: ({ media }: any) => {
        return {
          url: `${SOCIAL_FEATURES_CHAT?.UPLOAD_ATTACHMENT_CHAT}`,
          method: 'POST',
          body: media,
          headers: {
            'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
          },
        };
      },
      invalidatesTags: TAG,
    }),
    createNewGroup: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `chat/create-group`,
          method: 'POST',
          body: body,
          headers: {
            'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
          },
        };
      },
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetUserChatsQuery,
  useGetChatsContactsQuery,
  useUpdateChatMutation,
  useCreateNewGroupMutation,
  useChatAttachmentUploadMutation,
  useGetUserChatsInfoQuery,
} = chatApi;
