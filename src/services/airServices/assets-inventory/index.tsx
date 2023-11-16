import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const assetInventoryAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postAssetInventory: builder.mutation({
      query: (body: any) => ({
        url: END_POINTS?.ASSET_INVENTORY,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ASSETS_INVENTORY'],
    }),
    getAssetInventory: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.ASSET_INVENTORY}`,
        method: 'GET',
        params,
      }),
      providesTags: ['ASSETS_INVENTORY'],
    }),
    deleteAssetInventory: builder.mutation({
      query: (deleteInventoryParameter: any) => ({
        url: `/assets/{id}`,
        method: 'DELETE',
        params: deleteInventoryParameter?.queryParams,
      }),
      invalidatesTags: ['ASSETS_INVENTORY'],
    }),
  }),
});

export const {
  useGetAssetInventoryQuery,
  usePostAssetInventoryMutation,
  useDeleteAssetInventoryMutation,
} = assetInventoryAPI;
