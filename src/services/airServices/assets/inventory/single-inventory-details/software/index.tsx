import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'ASSETS_INVENTORY_SOFTWARE';

export const InventoryAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getInventorySoftware: builder?.query({
      query: (id: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY_SOFTWARE}/${id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),

    deleteInventorySoftware: builder?.mutation({
      query: (deleteInventorySoftwareId: any) => ({
        url: `${END_POINTS?.DELETE_INVENTORY_SOFTWARE}/${deleteInventorySoftwareId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetInventorySoftwareQuery,
  useDeleteInventorySoftwareMutation,
} = InventoryAPI;
