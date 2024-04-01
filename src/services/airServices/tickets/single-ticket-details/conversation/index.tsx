import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKETS_CONVERSATION_CANNED_RESPONSES';
const TAG_ONE = 'TICKETS_CONVERSATION_ARTICLES';
const TAG_TWO = 'TICKETS_CONVERSATION';

export const conversationAPI = baseAPI?.injectEndpoints({
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
        url: `${END_POINTS?.GET_CANNED_RESPONSES}`,
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
    postConversation: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.CONVERSATION_EMAIL}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [TAG_TWO],
    }),
    getConversation: builder.query({
      query: (params: any) => ({
        url: `${END_POINTS?.GET_CONVERSATION_EMAIL}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG_TWO],
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
} = conversationAPI;
