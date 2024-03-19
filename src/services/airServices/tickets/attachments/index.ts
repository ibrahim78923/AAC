import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'ATTACHMENTS';

export const singleAttachmentsApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getSingleAttachment: builder?.query({
      query: (getSingleAttachmentParameter: any) => ({
        url: `${END_POINTS?.GET_ATTACHMENT}/${getSingleAttachmentParameter?.pathParams?.id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    deleteSingleAttachment: builder?.mutation({
      query: (deleteSingleAttachmentParameter: any) => ({
        url: `${END_POINTS?.DELETE_ATTACHMENT}`,
        method: 'DELETE',
        params: deleteSingleAttachmentParameter?.queryParams,
      }),
    }),
    postAttachments: builder?.mutation({
      query: (postAttachmentParameter: any) => ({
        url: `${END_POINTS?.POST_ATTACHMENT}`,
        method: 'POST',
        body: postAttachmentParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteAllAttachments: builder?.mutation({
      query: (deleteAllAttachmentsParameter: any) => ({
        url: `${END_POINTS?.DELETE_ALL_ATTACHMENT}`,
        method: 'DELETE',
        params: deleteAllAttachmentsParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
    deleteMultipleAttachments: builder?.mutation({
      query: (deleteMultipleAttachmentsParameter: any) => ({
        url: `${END_POINTS?.DELETE_MULTIPLE_ATTACHMENT}`,
        method: 'DELETE',
        params: deleteMultipleAttachmentsParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetSingleAttachmentQuery,
  useDeleteSingleAttachmentMutation,
  useLazyGetSingleAttachmentQuery,
  useDeleteAllAttachmentsMutation,
  useDeleteMultipleAttachmentsMutation,
  usePostAttachmentsMutation,
} = singleAttachmentsApi;
