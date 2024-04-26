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
      query: ({ body }: any) => ({
        url: END_POINTS?.REMOVE_SOFTWARE_INSTALLATION,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetInventorySoftwareQuery,
  useDeleteInventorySoftwareMutation,
} = InventoryAPI;
