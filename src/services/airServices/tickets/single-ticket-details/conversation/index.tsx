import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'CANNED_RESPONSES';
const TAG_ONE = '/articles/get-all-articles';
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
  }),
});

export const {
  useGetCannedResponsesQuery,
  useLazyGetCannedResponsesQuery,
  useLazyGetConversationAllArticlesQuery,
  useGetConversationAllArticlesQuery,
} = conversationAPI;
