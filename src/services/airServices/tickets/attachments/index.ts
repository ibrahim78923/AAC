import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const { GET_ATTACHMENT, DELETE_ATTACHMENT } = END_POINTS;

const TAG = 'SINGLE_ATTACHMENT';

export const singleAttachmentsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSingleAttachment: builder.query({
      query: (getSingleAttachmentParameter: any) => ({
        url: `${GET_ATTACHMENT}/${getSingleAttachmentParameter?.pathParams?.id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    deleteSingleAttachment: builder.mutation({
      query: (deleteSingleAttachmentParameter: any) => ({
        url: `${DELETE_ATTACHMENT}`,
        method: 'DELETE',
        params: deleteSingleAttachmentParameter?.queryParams,
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
