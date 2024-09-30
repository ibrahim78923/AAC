import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'ATTACHMENTS';

export const getAttachmentAPI = baseAPI.injectEndpoints({
  endpoints: (builder: any) => ({
    postAirServicesPurchaseOrderDetailsAttachments: builder?.mutation({
      query: (postAttachmentParameter: any) => ({
        url: END_POINTS?.POST_ATTACHMENT,
        method: 'POST',
        body: postAttachmentParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const { usePostAirServicesPurchaseOrderDetailsAttachmentsMutation } =
  getAttachmentAPI;
