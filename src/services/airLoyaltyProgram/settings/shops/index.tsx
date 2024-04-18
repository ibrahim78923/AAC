import { baseAPI } from '@/services/base-api';

const TAG = 'MANAGE_SHOP';

export const manageShopAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    addShop: builder?.mutation({
      query: (body: any) => ({
        url: ``,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
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

export const { useAddShopMutation, useGetShopQuery } = manageShopAPI;
