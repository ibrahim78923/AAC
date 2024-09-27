import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'ASSETS_INVENTORY_PURCHASE_ORDER';

export const InventoryPurchaseOrderAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getAirServicesAssetInventoryPurchaseOrder: builder?.query({
      query: (id: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY_PURCHASE_ORDER}?id=${id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    deleteAirServicesAssetInventoryPurchaseOrder: builder?.mutation({
      query: (params: any) => ({
        url: END_POINTS?.DELETE_INVENTORY_PURCHASE_ORDER,
        method: 'PATCH',
        params,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetAirServicesAssetInventoryPurchaseOrderQuery,
  useDeleteAirServicesAssetInventoryPurchaseOrderMutation,
} = InventoryPurchaseOrderAPI;
