import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const manageShopAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getShopList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_SHOP_LIST,
        method: 'POST',
        params: apiDataParameter?.queryParams,
      }),
    }),
    addShop: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.CREATE_SHOP,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
    editSingleShop: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.UPDATE_SHOP,
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
    getSingleShopDetails: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.SHOP_DETAIL,
        method: 'GET',
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
  useGetSingleShopDetailsQuery,
} = manageShopAPI;
