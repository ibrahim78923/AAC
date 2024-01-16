import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'ASSETS_INVENTORY_CONTRACTS';

export const InventoryContractsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getInventoryContracts: builder?.query({
      query: (id: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY_CONTRACTS}?id=${id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useGetInventoryContractsQuery } = InventoryContractsAPI;
