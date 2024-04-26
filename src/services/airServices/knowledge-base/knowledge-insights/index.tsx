import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const knowledgeInsightsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getKnowledgeInsights: builder?.query({
      query: (getKnowledgeInsightsParameters: any) => ({
        url: END_POINTS?.GET_KNOWLEDGE_INSIGHTS,
        method: 'GET',
        params: getKnowledgeInsightsParameters?.queryParams,
      }),
    }),
    getKnowledgeInsightsDetails: builder?.query({
      query: (getKnowledgeInsightsDetailsParameters: any) => ({
        url: `${END_POINTS?.GET_KNOWLEDGE_INSIGHTS_DETAILS}`,
        method: 'GET',
        params: getKnowledgeInsightsDetailsParameters?.queryParams,
      }),
    }),
  }),
});

export const {
  useGetKnowledgeInsightsDetailsQuery,
  useGetKnowledgeInsightsQuery,
  useLazyGetKnowledgeInsightsQuery,
  useLazyGetKnowledgeInsightsDetailsQuery,
} = knowledgeInsightsAPI;
