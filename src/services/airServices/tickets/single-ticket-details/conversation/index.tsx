import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKETS_CONVERSATION_CANNED_RESPONSES';
const TAG_ONE = 'TICKETS_CONVERSATION_ARTICLES';
const TAG_TWO = 'TICKETS_CONVERSATION';

export const conversationAPI: any = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getCannedResponses: builder?.query({
      query: (params: any) => ({
        url: `${END_POINTS?.GET_CANNED_RESPONSES}`,
        method: 'GET',
        params: params,
      }),
      providesTags: [TAG],
    }),
    getConversationAllArticles: builder?.query({
      query: (params: any) => ({
        url: `${END_POINTS?.GET_ALL_ARTICLES}`,
        method: 'GET',
        params: params,
      }),
      providesTags: [TAG_ONE],
    }),
    getCannedResponsesForConversation: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_RESPONSES_LIST}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getAllArticlesForConversation: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_ALL_ARTICLES}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG_ONE],
    }),
    postConversation: builder?.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.CONVERSATION_EMAIL}`,
        method: 'POST',
        body: body,
      }),
    }),
    getConversation: builder?.query({
      query: (params: any) => ({
        url: `${END_POINTS?.GET_CONVERSATION_EMAIL}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG_TWO],
    }),
    editTicketConversationNote: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.EDIT_TICKET_CONVERSATION_NOTE}`,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
    deleteTicketConversation: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.DELETE_TICKET_CONVERSATION}`,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
    }),
  }),
});

export const {
  useGetCannedResponsesQuery,
  useLazyGetCannedResponsesQuery,
  useLazyGetConversationAllArticlesQuery,
  useGetConversationAllArticlesQuery,
  usePostConversationMutation,
  useGetConversationQuery,
  useGetCannedResponsesForConversationQuery,
  useGetAllArticlesForConversationQuery,
  useEditTicketConversationNoteMutation,
  useDeleteTicketConversationMutation,
} = conversationAPI;
