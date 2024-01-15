import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'ASSETS_INVENTORY_PURCHASE_ORDER';

export const InventoryPurchaseOrderAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getInventoryPurchaseOrder: builder?.query({
      query: (id: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY_PURCHASE_ORDER}?id=${id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useGetInventoryPurchaseOrderQuery } = InventoryPurchaseOrderAPI;
