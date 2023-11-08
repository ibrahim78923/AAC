import { baseAPI } from '@/services/base-api';

export const inventoryActivityAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    activityList: builder.query({
      query: () => ({
        url: `/assets/inventory?assetType=services&impact=low`,
        method: 'GET',
      }),
      providesTags: ['/assets/inventory'],
    }),
  }),
});

export const { useActivityListQuery } = inventoryActivityAPI;
