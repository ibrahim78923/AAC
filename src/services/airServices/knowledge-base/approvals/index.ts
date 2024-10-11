import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const { GET_UNAPPROVED_ARTICLES, POST_APPROVALS } = END_POINTS ?? {};

export const articlesApprovalAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getServicesKnowledgeBaseUnapprovedArticlesList: builder?.query({
      query: (getUnapprovedArticlesParameter: any) => ({
        url: GET_UNAPPROVED_ARTICLES,
        method: 'GET',
        params: getUnapprovedArticlesParameter?.queryParams,
      }),
    }),
    changeServicesKnowledgeBaseArticleApproval: builder?.mutation({
      query: (postApprovalParameters: any) => ({
        url: `${POST_APPROVALS}/${postApprovalParameters?.pathParams?.id}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLazyGetServicesKnowledgeBaseUnapprovedArticlesListQuery,
  useChangeServicesKnowledgeBaseArticleApprovalMutation,
} = articlesApprovalAPI;
