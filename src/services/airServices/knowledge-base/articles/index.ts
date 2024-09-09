import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'KNOWLEDGE_BASE_ARTICLES';

export const articlesAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getArticles: builder?.query({
      query: (getArticlesParameter: any) => ({
        url: END_POINTS?.KNOWLEDGE_BASE_ARTICLES,
        params: getArticlesParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getArticleById: builder?.query({
      query: (getSingleArticleParameter: any) => ({
        url: `${END_POINTS?.KNOWLEDGE_BASE_ARTICLE}/${getSingleArticleParameter?.pathParam?.articleId}`,
      }),
      providesTags: [TAG],
    }),
    postArticle: builder?.mutation({
      query: (postArticleParameter: any) => ({
        url: END_POINTS?.DELETE_KNOWLEDGE_BASE_ARTICLES,
        method: 'POST',
        body: postArticleParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    patchArticle: builder?.mutation({
      query: (patchArticleParameter: any) => ({
        url: `${END_POINTS?.DELETE_KNOWLEDGE_BASE_ARTICLES}`,
        method: 'PATCH',
        body: patchArticleParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteArticle: builder?.mutation({
      query: (deleteArticlesParameter: any) => ({
        url: END_POINTS?.DELETE_KNOWLEDGE_BASE_ARTICLES,
        method: 'DELETE',
        params: deleteArticlesParameter?.queryParams,
      }),
    }),
    getArticlesFoldersForFilter: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.ARTICLES_FOLDERS,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    postFolder: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.CREATE_FOLDER,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
    getFoldersDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.ARTICLES_FOLDERS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    getUsersDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    getUsersDropdownListForArticlesApprovals: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    getUsersDropdownListForAuthors: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    deleteFolderForArticle: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.DELETE_ARTICLE_FOLDER,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
    }),
    updateFolderForArticles: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.UPDATE_ARTICLE_FOLDER,
        method: 'PATCH',
        body: apiDataParameter?.body,
        params: apiDataParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
    getSingleFolderById: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_SINGLE_FOLDER_DETAIL,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getFoldersDropdownForMoveArticles: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.ARTICLES_FOLDERS,
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
  usePostArticleMutation,
  usePatchArticleMutation,
  useGetArticlesQuery,
  useDeleteArticleMutation,
  useGetArticleByIdQuery,
  usePostFolderMutation,
  useLazyGetArticlesQuery,
  useLazyGetFoldersDropdownQuery,
  useLazyGetUsersDropdownQuery,
  useGetArticlesFoldersForFilterQuery,
  useLazyGetArticlesFoldersForFilterQuery,
  useLazyGetUsersDropdownListForArticlesApprovalsQuery,
  useLazyGetUsersDropdownListForAuthorsQuery,
  useDeleteFolderForArticleMutation,
  useUpdateFolderForArticlesMutation,
  useGetSingleFolderByIdQuery,
  useLazyGetFoldersDropdownForMoveArticlesQuery,
} = articlesAPI;
