import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
import { transformResponse } from '@/utils/api';

const TAG = 'CUSTOMER_PORTAL_KNOWLEDGE_BASE';

export const knowledgeBaseAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getKnowledgeBaseFolder: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_KNOWLEDGE_BASE_FOLDER}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
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
        url: `${END_POINTS?.GET_SINGLE_KNOWLEDGE_BASE_ARTICLES}/${params?.id}/${params?.companyId}`,
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

    getAllAssociateAssetsDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.CUSTOMER_PORTAL_ASSET_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse,
      providesTags: [TAG],
    }),
    getAllCustomerPortalArticlesDropdown: builder?.query({
      query: (params: any) => ({
        url: `${END_POINTS?.GET_ALL_ARTICLES}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) =>
        response?.data?.articles?.map((article: any) => ({
          title: article?.title,
          _id: article?._id,
          folderId: article?.folder?._id,
        })),
      providesTags: [TAG],
    }),
    postReportAnIssueCustomerPortalArticles: builder?.mutation({
      query: (postReportAnIssueParameter: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'POST',
        body: postReportAnIssueParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getAllRequestersDropdownCustomerPortalArticles: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.REQUESTER_LIST}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.users;
      },
    }),
  }),
});

export const {
  useGetKnowledgeBaseFolderQuery,
  useGetAllKnowledgeBaseArticleQuery,
  useGetSingleKnowledgeBaseArticleQuery,
  usePostArticleFeedbackMutation,
  useLazyGetAllAssociateAssetsDropdownQuery,
  useLazyGetAllCustomerPortalArticlesDropdownQuery,
  usePostReportAnIssueCustomerPortalArticlesMutation,
  useLazyGetAllRequestersDropdownCustomerPortalArticlesQuery,
} = knowledgeBaseAPI;
