import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'CUSTOMER_PORTAL_KNOWLEDGE_BASE';

export const knowledgeBaseAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getKnowledgeBaseFolder: builder?.query({
      query: () => ({
        url: `${END_POINTS?.GET_KNOWLEDGE_BASE_FOLDER}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getAllKnowledgeBaseArticle: builder?.query({
      query: (params: any) => ({
        url: `${END_POINTS?.GET_ALL_ARTICLES}`,
        method: 'GET',
        params: params,
      }),
      providesTags: [TAG],
    }),
    getSingleKnowledgeBaseArticle: builder?.query({
      query: (params: any) => ({
        url: `${END_POINTS?.GET_SINGLE_KNOWLEDGE_BASE_ARTICLES}/${params?.id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    postArticleFeedback: builder?.mutation({
      query: (articleFeedbackParameter: any) => ({
        url: `${END_POINTS?.POST_ARTICLES_FEEDBACK}`,
        method: 'POST',
        body: articleFeedbackParameter,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetKnowledgeBaseFolderQuery,
  useGetAllKnowledgeBaseArticleQuery,
  useGetSingleKnowledgeBaseArticleQuery,
  usePostArticleFeedbackMutation,
} = knowledgeBaseAPI;
