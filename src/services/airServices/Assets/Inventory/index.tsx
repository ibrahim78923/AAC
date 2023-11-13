import { endpoints } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'InventoryActivity';
export const inventoryActivityAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    activityList: builder.query({
      query: () => ({
        url: `${endpoints?.InventoryActivity}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useActivityListQuery } = inventoryActivityAPI;
