import { COMMON_DOCUMENTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const commonDocumentsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postDocumentFolder: builder.mutation({
      query: ({ body }: any) => ({
        url: `${COMMON_DOCUMENTS.POST_DOCUMENTS_FOLDER}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['MyDocuments'],
    }),
    getDocumentFolder: builder.query({
      query: ({ organizationId, pages = 1, limit = 10 }: any) => ({
        url: `${COMMON_DOCUMENTS.GET_DOCUMENT_FOLDER}?page=${pages}&limit=${limit}&organizationId=${organizationId}`,
        method: 'GET',
      }),
      providesTags: ['MyDocuments'],
    }),
    updateFolder: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${COMMON_DOCUMENTS.PATCH_DOCUMENT_FOLDER_ID}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['MyDocuments'],
    }),
  }),
});

export const {
  usePostDocumentFolderMutation,
  useGetDocumentFolderQuery,
  useUpdateFolderMutation,
} = commonDocumentsAPI;
