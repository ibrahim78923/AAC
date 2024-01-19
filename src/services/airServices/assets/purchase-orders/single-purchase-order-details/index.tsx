import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'PURCHASEORDER';
export const purchaseOrderAPI = baseAPI.injectEndpoints({
  endpoints: (builder: any) => ({
    getPurchaseOrderList: builder.query({
      query: (params: any) => ({
        url: `${END_POINTS?.PURCHASE_ORDER_LIST}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useGetPurchaseOrderListQuery } = purchaseOrderAPI;
