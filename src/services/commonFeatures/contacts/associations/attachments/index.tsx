import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['CONTACT_ASSOCIATION'];
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

    deleteAttachment: builder?.mutation({
      query: (id: any) => ({
        url: `${END_POINTS?.DELETE_ATTACHMENT}?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),

    updateAttachment: builder.mutation({
      query: ({ _id, body }: { _id: any; body: any }) => ({
        url: `${END_POINTS?.EDIT_ATTACHMENT}/${_id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: TAG,
    }),
  }),
});

export const { usePostAttachmentMutation, useDeleteAttachmentMutation } =
  contactAssociationsAPI;
