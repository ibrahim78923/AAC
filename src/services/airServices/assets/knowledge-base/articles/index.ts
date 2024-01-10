import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = 'KNOWLEDGE_BASE_ARTICLES';
const { KNOWLEDGE_BASE_ARTICLES, DROPDOWN_FOLDERS } = END_POINTS;
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
      query: ({ id }: any) => ({
        url: `${KNOWLEDGE_BASE_ARTICLES}/${id}`,
      }),
      providesTags: [TAG],
    }),
    postArticle: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${KNOWLEDGE_BASE_ARTICLES}/${id}`,
        method: 'POST',
        body: body,
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
        url: KNOWLEDGE_BASE_ARTICLES,
        method: 'DELETE',
        params,
      }),
      invalidatesTags: [TAG],
    }),
    getFolders: builder.query({
      query: (params: any) => ({
        url: DROPDOWN_FOLDERS,
        params,
      }),
      providesTags: [TAG],
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
} = articlesAPI;
