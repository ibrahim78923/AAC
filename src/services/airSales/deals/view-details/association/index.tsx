import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG_TYPE = {
  DEALS_ASSOCIATION: 'DEALS_ASSOCIATION',
  DEALS: 'DEALS',
  COMPANY: 'COMPANY',
  DEALS_ATTACHMENTS: 'DEALS_ATTACHMENTS',
  ORGANIZATION: 'Organization',
  CONTACT_ASSOCIATION: 'CONTACT_ASSOCIATION',
  QUOTES: 'AIR_SALES_QUOTES',
  CONTACTS: 'CONTACTS',
};

export const associationAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createAssociation: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.CREATE_ASSOCIATION,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: [
        TAG_TYPE?.DEALS_ASSOCIATION,
        TAG_TYPE?.COMPANY,
        TAG_TYPE?.CONTACTS,
        TAG_TYPE?.QUOTES,
      ],
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

    getAssociateProducts: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.GET_DEAL_PRODUCTS}/${id}`,
        method: 'GET',
      }),
      providesTags: [TAG_TYPE?.DEALS_ASSOCIATION],
    }),

    updateAssociateProduct: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.UPADTE_DEAL_PRODUCT}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: [TAG_TYPE?.DEALS_ASSOCIATION],
    }),
  }),
});

export const {
  useCreateAssociationMutation,
  useDeleteAssociationMutation,
  usePostAttachmentsMutation,
  useLazyGetAttachmentsByIdQuery,
  useGetTicketsQuery,
  useUpdateAssociateProductMutation,
  useGetAssociateProductsQuery,
} = associationAPI;
