import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG_TYPE = {
  DEALS_ASSOCIATION: 'DEALS_ASSOCIATION',
  DEALS: 'DEALS',
  COMPANY: 'COMPANY',
  DEALS_ATTACHMENTS: 'DEALS_ATTACHMENTS',
  ORGANIZATION: 'Organization',
  CONTACT_ASSOCIATION: 'CONTACT_ASSOCIATION',
};

export const associationAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createAssociation: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.CREATE_ASSOCIATION,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: [TAG_TYPE?.DEALS_ASSOCIATION, TAG_TYPE?.COMPANY],
    }),

    deleteAssociation: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.DELETE_ASSOCIATION,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: [TAG_TYPE?.DEALS_ASSOCIATION],
    }),
    getAttachmentsById: builder.query({
      query: ({ id }: any) => ({
        url: `${END_POINTS?.GET_ATTACHMENT}/${id}`,
        method: 'GET',
      }),
      providesTags: [TAG_TYPE?.ORGANIZATION],
    }),
    postAttachments: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.POST_ATTACHMENT,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: [TAG_TYPE?.DEALS_ATTACHMENTS],
    }),
    getTickets: builder.query({
      query: (params: any) => ({
        url: `${END_POINTS?.GET_ASSOCIATION}`,
        method: 'GET',
        params,
      }),
      providesTags: [
        TAG_TYPE?.DEALS,
        TAG_TYPE?.DEALS_ASSOCIATION,
        TAG_TYPE?.CONTACT_ASSOCIATION,
      ],
    }),
  }),
});

export const {
  useCreateAssociationMutation,
  useDeleteAssociationMutation,
  usePostAttachmentsMutation,
  useLazyGetAttachmentsByIdQuery,
  useGetTicketsQuery,
} = associationAPI;
