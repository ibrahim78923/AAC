import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['CONTACTS'];
export const contactAssociationsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postAttachment: builder.mutation({
      query: (body: any) => {
        return {
          url: END_POINTS?.POST_ATTACHMENT,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),
  }),
});

export const { usePostAttachmentMutation } = contactAssociationsAPI;
