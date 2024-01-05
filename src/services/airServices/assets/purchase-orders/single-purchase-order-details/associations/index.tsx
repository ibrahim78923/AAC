import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'PURCHASE_ORDER_ASSOCIATIONS';
const id = '6596d4bc33a332bd5054642e';
export const associationsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getAssociations: builder?.query({
      query: (purchaseOrderId: any) => ({
        url: `${END_POINTS?.PURCHASE_ORDER_ASSOCIATIONS}/${
          purchaseOrderId ?? id
        }`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    postAssociations: builder?.mutation({
      query: (postAssociationsParameter: any) => ({
        url: `${END_POINTS?.PURCHASE_ORDER_ADD_ASSOCIATIONS}/${
          postAssociationsParameter?.purchaseOrderId ?? id
        }`,
        method: 'PATCH',
        body: postAssociationsParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteAssociations: builder?.mutation({
      query: (deleteAssociationsParameter: any) => ({
        url: `${END_POINTS?.PURCHASE_ORDER_DELETE_ASSOCIATIONS}/${deleteAssociationsParameter?.ticketId}`,
        method: 'PATCH',
        body: deleteAssociationsParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useDeleteAssociationsMutation,
  useGetAssociationsQuery,
  usePostAssociationsMutation,
} = associationsAPI;
