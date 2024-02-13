import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'ATTACHMENT';
export const getAttachmentAPI = baseAPI.injectEndpoints({
  endpoints: (builder: any) => ({
    getAttachment: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.GET_ATTACHMENT}${id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    postAttachment: builder.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.POST_ATTACHMENT}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteAttachment: builder?.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.DELETE_ATTACHMENT}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    patchAttachment: builder.mutation({
      query: ({ _id, body }: { _id: any; body: any }) => ({
        url: `${END_POINTS?.EDIT_ATTACHMENT}/${_id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetAttachmentQuery,
  usePostAttachmentMutation,
  useDeleteAttachmentQuery,
} = getAttachmentAPI;
