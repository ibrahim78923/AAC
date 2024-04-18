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
  }),
});

export const { useAddShopMutation } = manageShopAPI;
