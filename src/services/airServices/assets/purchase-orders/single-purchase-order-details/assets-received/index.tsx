import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'ASSETS_RECEIVED';
export const assetReceivedApi = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getAssetsReceived: builder?.query({
      query: (params) => ({
        url: END_POINTS?.ASSETS_RECEIVED,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    getPurchaseOrderById: builder?.query({
      query: (purchaseOrderId) => ({
        url: `${END_POINTS?.ASSETS_PURCHASEORDER_DETAIL}/${purchaseOrderId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
  }),
});

export const {
  useLazyGetAssetsReceivedQuery,
  useLazyGetPurchaseOrderByIdQuery,
} = assetReceivedApi;
