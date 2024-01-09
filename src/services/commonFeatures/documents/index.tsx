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
      query: (body) => {
        const formData = new FormData();
        formData.append('file', body?.file);
        formData.append('name', body?.name);
        formData.append('folderId', body?.folderId);
        return {
          url: `${COMMON_DOCUMENTS.POST_DOCUMENTS_FILE}`,
          method: 'POST',
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ['MyDocuments'],
    }),
    getDocumentFolder: builder.query({
      query: ({
        organizationId = '',
        parentFolderId = '',
        pages = 1,
        limit = 10,
        search = '',
      }: any) => ({
        url: `${COMMON_DOCUMENTS.GET_DOCUMENT_FOLDER}?page=${pages}&limit=${limit}&organizationId=${organizationId}&parentFolderId=${parentFolderId}&search=${search}`,
        method: 'GET',
      }),
      providesTags: ['MyDocuments'],
    }),
    getDocumentFile: builder.query({
      query: ({ folderId = '', pages = 1, limit = 10, search = '' }: any) => ({
        url: `${COMMON_DOCUMENTS.GET_DOCUMENT_FILE}?page=${pages}&limit=${limit}&folderId=${folderId}&search=${search}`,
        method: 'GET',
      }),
      providesTags: ['MyDocuments'],
    }),
    updateFolder: builder.mutation({
      query: ({ id = '', body }: any) => ({
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
        url: `${COMMON_DOCUMENTS.DELETE_DOCUMENT_FILE_ID}?ids=${ids}`,
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
} = commonDocumentsAPI;
