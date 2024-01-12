import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const { GET_INVENTORY_OVERVIEW } = END_POINTS;
export const inventoryOverview = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getInventoryOverview: builder.query({
      query: (id: any) => ({
        url: `${GET_INVENTORY_OVERVIEW}/${id}`,
        method: 'GET',
      }),
      providesTags: ['INVENTORY_OVERVIEW'],
    }),
  }),
});

export const { useGetInventoryOverviewQuery } = inventoryOverview;
