import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = ' INVENTORY_ACTIVITY';
export const inventoryActivityAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    activityList: builder?.query({
      query: () => ({
        url: `${END_POINTS?.INVENTORY_ACTIVITY}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useActivityListQuery } = inventoryActivityAPI;
