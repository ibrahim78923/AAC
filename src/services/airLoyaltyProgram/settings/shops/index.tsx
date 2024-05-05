import { baseAPI } from '@/services/base-api';

export const manageShopAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getShopList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: ``,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    addShop: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: ``,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
    editSingleShop: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: ``,
        method: 'PATCH',
        body: apiDataParameter?.body,
      }),
    }),
    deleteShop: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: ``,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
    }),
  }),
});

export const {
  useAddShopMutation,
  useGetShopListQuery,
  useLazyGetShopListQuery,
  useDeleteShopMutation,
  useEditSingleShopMutation,
} = manageShopAPI;
