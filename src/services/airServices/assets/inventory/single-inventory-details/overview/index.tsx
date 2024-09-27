import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const { GET_INVENTORY_OVERVIEW } = END_POINTS;
const TAG = ['INVENTORY_OVERVIEW'];

export const inventoryOverview = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getAirServicesAssetsSingleInventoryOverview: builder?.query({
      query: (id: any) => ({
        url: `${GET_INVENTORY_OVERVIEW}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
  }),
});

export const { useGetAirServicesAssetsSingleInventoryOverviewQuery } =
  inventoryOverview;
