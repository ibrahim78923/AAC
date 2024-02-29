import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'PURCHASE_ORDER_ASSOCIATIONS';
export const associationsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getAssociations: builder?.query({
      query: (purchaseOrderId: any) => ({
        url: `${END_POINTS?.PURCHASE_ORDER_ASSOCIATIONS}/${purchaseOrderId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    postAssociations: builder?.mutation({
      query: (postAssociationsParameter: any) => ({
        url: `${END_POINTS?.PURCHASE_ORDER_ADD_ASSOCIATIONS}/${postAssociationsParameter?.purchaseOrderId}`,
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
