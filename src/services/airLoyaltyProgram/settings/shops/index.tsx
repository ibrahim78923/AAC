import { baseAPI } from '@/services/base-api';

const TAG = 'MANAGE_SHOP';

export const manageShopAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getShop: builder?.query({
      query: (params: any) => ({
        url: ``,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useGetShopQuery } = manageShopAPI;
