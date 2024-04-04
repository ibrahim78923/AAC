import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const associationAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createAssociation: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.CREATE_ASSOCIATION,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['DEALS_ASSOCIATION', 'COMPANY'],
    }),

    deleteAssociation: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.DELETE_ASSOCIATION,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['DEALS_ASSOCIATION'],
    }),
    postAttachments: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.POST_ATTACHMENT,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['DEALS_ATTACHMENTS'],
    }),
  }),
});

export const {
  useCreateAssociationMutation,
  useDeleteAssociationMutation,
  usePostAttachmentsMutation,
} = associationAPI;
