import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = 'KNOWLEDGE_BASE_ARTICLES';
const {
  KNOWLEDGE_BASE_ARTICLES,
  KNOWLEDGE_BASE_ARTICLE,
  ARTICLES_FOLDERS,
  CREATE_FOLDER,
  POST_KNOWLEDGE_BASE_ARTICLES,
  DELETE_KNOWLEDGE_BASE_ARTICLES,
} = END_POINTS;
export const articlesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (params: any) => ({
        url: KNOWLEDGE_BASE_ARTICLES,
        params,
      }),
      providesTags: [TAG],
    }),
    getArticleById: builder.query({
      query: (id: any) => ({
        url: `${KNOWLEDGE_BASE_ARTICLE}/${id}`,
      }),
      providesTags: [TAG],
    }),
    postArticle: builder.mutation({
      query: (body: any) => ({
        url: POST_KNOWLEDGE_BASE_ARTICLES,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    updateArticle: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${KNOWLEDGE_BASE_ARTICLES}/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteArticle: builder.mutation({
      query: (params: any) => ({
        url: DELETE_KNOWLEDGE_BASE_ARTICLES,
        method: 'DELETE',
        params,
      }),
      invalidatesTags: [TAG],
    }),
    getFolders: builder.query({
      query: () => ARTICLES_FOLDERS,
      providesTags: [TAG],
    }),
    postFolder: builder.mutation({
      query: (body: any) => ({
        url: CREATE_FOLDER,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useUpdateArticleMutation,
  usePostArticleMutation,
  useGetArticlesQuery,
  useDeleteArticleMutation,
  useGetArticleByIdQuery,
  useGetFoldersQuery,
  usePostFolderMutation,
} = articlesAPI;
