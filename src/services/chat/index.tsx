import { PAGINATION } from '@/config';
import { END_POINTS } from '@/routesConstants/endpoints';
import { SOCIAL_FEATURES_CHAT } from '@/routesConstants/paths';
import { baseAPI } from '@/services/base-api';
const TAG = ['CHAT'];
export const chatApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUserChats: builder.query({
      query: ({ activeChatId, params, limit, page, isGroup }: any) => ({
        url: `${SOCIAL_FEATURES_CHAT?.CHAT}${activeChatId}?page=${
          page ?? PAGINATION?.CURRENT_PAGE
        }&limit=${limit ?? 10}&isGroup=${isGroup}`,
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
        url: `${SOCIAL_FEATURES_CHAT?.CHAT_LIST}?isGroup=${isGroup}${query}`,
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
      invalidatesTags: ['attachments'],
    }),
    createNewGroup: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_CHAT?.CREATE_GROUP}`,
          method: 'POST',
          body: body,
          headers: {
            'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
          },
        };
      },
      invalidatesTags: TAG,
    }),
    getChatUsers: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.USER_LIST}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
    deleteChatIds: builder.mutation({
      query: ({ ids }: any) => ({
        url: `${SOCIAL_FEATURES_CHAT?.CHAT}${ids}`,
        method: 'DELETE',
      }),
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
  useGetChatUsersQuery,
  useDeleteChatIdsMutation,
} = chatApi;
