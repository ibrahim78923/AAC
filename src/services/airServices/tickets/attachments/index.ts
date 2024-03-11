import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'SINGLE_ATTACHMENT';

export const singleAttachmentsApi = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
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
      invalidatesTags: [TAG],
    }),
    postAttachments: builder?.mutation({
      query: (postAttachmentParameter: any) => ({
        url: `${END_POINTS?.POST_ATTACHMENT}`,
        method: 'DELETE',
        body: postAttachmentParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetSingleAttachmentQuery,
  useDeleteSingleAttachmentMutation,
  useLazyGetSingleAttachmentQuery,
} = singleAttachmentsApi;
