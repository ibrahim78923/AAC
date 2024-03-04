import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = 'KNOWLEDGE_BASE_ARTICLES';
const TAG_FOUR = 'USERS_DROPDOWN';
const {
  KNOWLEDGE_BASE_ARTICLES,
  KNOWLEDGE_BASE_ARTICLE,
  ARTICLES_FOLDERS,
  CREATE_FOLDER,
  DELETE_KNOWLEDGE_BASE_ARTICLES,
} = END_POINTS;
export const articlesAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder?.query({
      query: (getArticlesParameter: any) => ({
        url: KNOWLEDGE_BASE_ARTICLES,
        params: getArticlesParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getArticleById: builder?.query({
      query: (getSingleArticleParameter: any) => ({
        url: `${KNOWLEDGE_BASE_ARTICLE}/${getSingleArticleParameter?.pathParam?.articleId}`,
      }),
      providesTags: [TAG],
    }),
    postArticle: builder?.mutation({
      query: (postArticleParameter: any) => ({
        url: DELETE_KNOWLEDGE_BASE_ARTICLES,
        method: 'POST',
        body: postArticleParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    patchArticle: builder?.mutation({
      query: (patchArticleParameter: any) => ({
        url: `${DELETE_KNOWLEDGE_BASE_ARTICLES}`,
        method: 'PATCH',
        body: patchArticleParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteArticle: builder?.mutation({
      query: (deleteArticlesParameter: any) => ({
        url: DELETE_KNOWLEDGE_BASE_ARTICLES,
        method: 'DELETE',
        params: deleteArticlesParameter?.queryParams,
      }),
    }),
    getFolders: builder?.query({
      query: () => ({
        url: ARTICLES_FOLDERS,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getUnapprovedArticles: builder?.query({
      query: (getUnapprovedArticlesParameter: any) => ({
        url: END_POINTS?.GET_UNAPPROVED_ARTICLES,
        method: 'GET',
        params: getUnapprovedArticlesParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    postFolder: builder?.mutation({
      query: (body: any) => ({
        url: CREATE_FOLDER,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    getFoldersDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: ARTICLES_FOLDERS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG],
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
      providesTags: [TAG_FOUR],
    }),
  }),
});

export const {
  usePostArticleMutation,
  usePatchArticleMutation,
  useGetArticlesQuery,
  useDeleteArticleMutation,
  useGetArticleByIdQuery,
  useGetFoldersQuery,
  usePostFolderMutation,
  useLazyGetArticlesQuery,
  useLazyGetFoldersDropdownQuery,
  useLazyGetUsersDropdownQuery,
  useGetUnapprovedArticlesQuery,
} = articlesAPI;
