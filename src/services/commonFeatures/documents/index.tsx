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

    postDocumentFiles: builder.mutation({
      query: ({ body }: any) => ({
        url: `${COMMON_DOCUMENTS.POST_DOCUMENTS_FILE}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['MyDocuments'],
    }),

    getDocumentFolder: builder.query({
      query: ({ params }) => ({
        url: COMMON_DOCUMENTS.GET_DOCUMENT_FOLDER,
        method: 'GET',
        params: params,
      }),
      providesTags: ['MyDocuments'],
    }),

    getDocumentFile: builder.query({
      query: ({ params }) => ({
        url: COMMON_DOCUMENTS.GET_DOCUMENT_FILE,
        method: 'GET',
        params: params,
      }),
      providesTags: ['MyDocuments'],
    }),

    updateFile: builder.mutation({
      query: ({ id = '', body }: any) => ({
        url: `${COMMON_DOCUMENTS.PATCH_DOCUMENT_FILE_ID}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['MyDocuments'],
    }),
    updateFolder: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${COMMON_DOCUMENTS.PATCH_DOCUMENT_FOLDER_ID}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['MyDocuments'],
    }),
    deleteFolders: builder.mutation({
      query: ({ ids }) => ({
        url: `${COMMON_DOCUMENTS.DELETE_DOCUMENT_FOLDER_ID}?${ids}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MyDocuments'],
    }),
    deleteFiles: builder.mutation({
      query: ({ ids }) => ({
        url: `${COMMON_DOCUMENTS.DELETE_DOCUMENT_FILE_ID}/${ids}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MyDocuments'],
    }),
  }),
});

export const {
  usePostDocumentFolderMutation,
  useGetDocumentFolderQuery,
  useUpdateFolderMutation,
  useDeleteFoldersMutation,
  usePostDocumentFilesMutation,
  useGetDocumentFileQuery,
  useDeleteFilesMutation,
  useUpdateFileMutation,
} = commonDocumentsAPI;
