import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const articlesAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getUnapprovedArticles: builder?.query({
      query: (getUnapprovedArticlesParameter: any) => ({
        url: END_POINTS?.GET_UNAPPROVED_ARTICLES,
        method: 'GET',
        params: getUnapprovedArticlesParameter?.queryParams,
      }),
    }),
    postArticleApproval: builder?.mutation({
      query: (getUnapprovedArticlesParameter: any) => ({
        url: `${END_POINTS?.POST_APPROVALS}/${getUnapprovedArticlesParameter?.pathParams?.id}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLazyGetUnapprovedArticlesQuery,
  usePostArticleApprovalMutation,
} = articlesAPI;
