import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const { GET_PURCHASE_ORDER_OVERVIEW } = END_POINTS;
export const purchaseOrderOverview = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPurchaseOrderOverview: builder.query({
      query: (id: any) => ({
        url: `${GET_PURCHASE_ORDER_OVERVIEW}/${id}`,
        method: 'GET',
      }),
      providesTags: ['PURCHASE_ORDER_OVERVIEW'],
    }),
  }),
});

export const { useGetPurchaseOrderOverviewQuery } = purchaseOrderOverview;
