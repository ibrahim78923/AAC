import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'ASSETS_INVENTORY';

export const inventoryAPI: any = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getInventory: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),

    getExportInventory: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
      providesTags: [TAG],
    }),

    postInventory: builder?.mutation({
      query: (postInventoryParameter: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY}`,
        method: 'POST',
        body: postInventoryParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),

    putInventory: builder?.mutation({
      query: (putInventoryParameter: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY}/${putInventoryParameter?.pathParam?.id}`,
        method: 'PUT',
        body: putInventoryParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),

    deleteInventory: builder?.mutation({
      query: (deleteInventoryParameter: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY}`,
        method: 'DELETE',
        params: deleteInventoryParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  usePostInventoryMutation,
  useGetInventoryQuery,
  useDeleteInventoryMutation,
  useGetInventoryByIdQuery,
  usePutInventoryMutation,
  useLazyGetInventoryQuery,
  useLazyGetExportInventoryQuery,
  usePatchBulkUpdateInventoryMutation,
} = inventoryAPI;
