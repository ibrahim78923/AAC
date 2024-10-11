import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'KNOWLEDGE_BASE_ARTICLES';

const {
  KNOWLEDGE_BASE_ARTICLES,
  KNOWLEDGE_BASE_ARTICLE,
  DELETE_KNOWLEDGE_BASE_ARTICLES,
  ARTICLES_FOLDERS,
  CREATE_FOLDER,
  DELETE_ARTICLE_FOLDER,
  UPDATE_ARTICLE_FOLDER,
  GET_SINGLE_FOLDER_DETAIL,
  DROPDOWN_USERS,
} = END_POINTS ?? {};

export const articlesAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getServicesKnowledgeBaseArticlesList: builder?.query({
      query: (getArticlesParameter: any) => ({
        url: KNOWLEDGE_BASE_ARTICLES,
        params: getArticlesParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getServicesKnowledgeBaseSingleArticleById: builder?.query({
      query: (getSingleArticleParameter: any) => ({
        url: `${KNOWLEDGE_BASE_ARTICLE}/${getSingleArticleParameter?.pathParam?.articleId}/${getSingleArticleParameter?.pathParam?.companyId}`,
      }),
      providesTags: [TAG],
    }),
    addServicesKnowledgeBaseSingleArticle: builder?.mutation({
      query: (postArticleParameter: any) => ({
        url: DELETE_KNOWLEDGE_BASE_ARTICLES,
        method: 'POST',
        body: postArticleParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    updateServicesKnowledgeBaseSingleArticle: builder?.mutation({
      query: (patchArticleParameter: any) => ({
        url: DELETE_KNOWLEDGE_BASE_ARTICLES,
        method: 'PATCH',
        body: patchArticleParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteServicesKnowledgeBaseMultipleArticles: builder?.mutation({
      query: (deleteArticlesParameter: any) => ({
        url: DELETE_KNOWLEDGE_BASE_ARTICLES,
        method: 'DELETE',
        params: deleteArticlesParameter?.queryParams,
      }),
    }),
    getServicesKnowledgeBaseFoldersListForFilter: builder?.query({
      query: (apiDataParameter: any) => ({
        url: ARTICLES_FOLDERS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    addServicesKnowledgeBaseSingleFolder: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: CREATE_FOLDER,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
    deleteServicesKnowledgeBaseSingleFolder: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: DELETE_ARTICLE_FOLDER,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
    }),
    updateServicesKnowledgeBaseSingleFolder: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: UPDATE_ARTICLE_FOLDER,
        method: 'PATCH',
        body: apiDataParameter?.body,
        params: apiDataParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
    getServicesKnowledgeBaseSingleFolderById: builder?.query({
      query: (apiDataParameter: any) => ({
        url: GET_SINGLE_FOLDER_DETAIL,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getServicesKnowledgeBaseFoldersDropdownForMoveArticles: builder?.query({
      query: ({ params }: any) => ({
        url: ARTICLES_FOLDERS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    getServicesKnowledgeBaseUsersDropdownListForArticlesApprovals:
      builder?.query({
        query: ({ params }: any) => ({
          url: DROPDOWN_USERS,
          method: 'GET',
          params,
        }),
        transformResponse: (response: any) => {
          if (response) return response?.data;
        },
      }),
    getServicesKnowledgeBaseUsersDropdownListForAuthors: builder?.query({
      query: ({ params }: any) => ({
        url: DROPDOWN_USERS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
  }),
});

export const {
  useLazyGetServicesKnowledgeBaseArticlesListQuery,
  useGetServicesKnowledgeBaseSingleFolderByIdQuery,
  useAddServicesKnowledgeBaseSingleArticleMutation,
  useUpdateServicesKnowledgeBaseSingleArticleMutation,
  useDeleteServicesKnowledgeBaseMultipleArticlesMutation,
  useDeleteServicesKnowledgeBaseSingleFolderMutation,
  useGetServicesKnowledgeBaseFoldersListForFilterQuery,
  useLazyGetServicesKnowledgeBaseFoldersListForFilterQuery,
  useUpdateServicesKnowledgeBaseSingleFolderMutation,
  useAddServicesKnowledgeBaseSingleFolderMutation,
  useGetServicesKnowledgeBaseSingleArticleByIdQuery,
  useLazyGetServicesKnowledgeBaseUsersDropdownListForArticlesApprovalsQuery,
  useLazyGetServicesKnowledgeBaseUsersDropdownListForAuthorsQuery,
  useLazyGetServicesKnowledgeBaseFoldersDropdownForMoveArticlesQuery,
  useLazyGetServicesKnowledgeBaseSingleArticleByIdQuery,
} = articlesAPI;
