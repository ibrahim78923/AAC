import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const { GET_KNOWLEDGE_INSIGHTS, GET_KNOWLEDGE_INSIGHTS_DETAILS } =
  END_POINTS ?? {};

export const knowledgeInsightsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getServicesKnowledgeBaseKnowledgeInsightsList: builder?.query({
      query: (getKnowledgeInsightsParameters: any) => ({
        url: GET_KNOWLEDGE_INSIGHTS,
        method: 'GET',
        params: getKnowledgeInsightsParameters?.queryParams,
      }),
    }),
    getServicesKnowledgeBaseSingleKnowledgeInsightsDetails: builder?.query({
      query: (getKnowledgeInsightsDetailsParameters: any) => ({
        url: GET_KNOWLEDGE_INSIGHTS_DETAILS,
        method: 'GET',
        params: getKnowledgeInsightsDetailsParameters?.queryParams,
      }),
    }),
  }),
});

export const {
  useGetServicesKnowledgeBaseKnowledgeInsightsListQuery,
  useGetServicesKnowledgeBaseSingleKnowledgeInsightsDetailsQuery,
} = knowledgeInsightsAPI;
