import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'ASSETS_PURCHASEORDER';
const TAG_FIVE = 'ASSETS_ITEM_ADDED';
const TAG_FOUR = 'DROPDOWN_DEPARTMENT';
const TAG_TWO = 'DROPDOWN_ALL_ASSETS';
const TAG_THREE = 'PURCHASE_ORDER';
export const singlePurchaseOrderAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    postAssetPurchaseOrder: builder?.mutation({
      query: (postPurchaseOrderParameter: any) => ({
        url: `${END_POINTS?.ASSETS_PURCHASEORDER}`,
        method: 'POST',
        body: postPurchaseOrderParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),

    deletePurchaseOrder: builder?.mutation({
      query: (deletePurchaseOrderParameter: any) => ({
        url: `${END_POINTS?.ASSETS_PURCHASEORDER_DETAIL}`,
        method: 'DELETE',
        params: deletePurchaseOrderParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
    getDepartmentDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_DEPARTMENT}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.departments;
      },
      providesTags: [TAG_FOUR],
    }),
    getLocationsDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_LOCATION}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_FOUR],
    }),
    getAllAssetsList: builder?.query({
      query: ({ param }: any) => ({
        url: `${END_POINTS?.DROPDOWN_ALL_ASSETS}`,
        method: 'GET',
        params: param,
      }),
      providesTags: [TAG_TWO],
    }),

    getAddToPurchaseOrderById: builder?.query({
      query: (getSingleAddToPurchaseOrderParameter: any) => ({
        url: `${END_POINTS?.ASSETS_PURCHASEORDER_DETAIL}/${getSingleAddToPurchaseOrderParameter?.pathParam?.purchaseOrderId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    patchAddToPurchaseOrder: builder?.mutation({
      query: (putAddToPurchaseOrderParameter: any) => ({
        url: `${END_POINTS?.EDIT_NEW_PURCHASEORDER}`,
        method: 'PATCH',
        body: putAddToPurchaseOrderParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    patchAddToItem: builder?.mutation({
      query: (putAddToItemParameter: any) => ({
        url: `${END_POINTS?.EDIT_NEW_ITEM}`,
        method: 'PATCH',
        body: putAddToItemParameter?.body,
      }),
      invalidatesTags: [TAG_FIVE, TAG_THREE],
    }),
    getAddToPurchaseOrderByIdForReceivedItems: builder?.query({
      query: (getSingleAddToPurchaseOrderParameter: any) => ({
        url: `${END_POINTS?.ASSETS_PURCHASEORDER_DETAIL}/${getSingleAddToPurchaseOrderParameter?.pathParam?.purchaseOrderId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getPurchaseOrderByIdForAddToInventory: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.ASSETS_PURCHASEORDER_DETAIL}/${apiDataParameter?.pathParams?.purchaseOrderId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getDepartmentDropdownForPurchaseOrder: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_DEPARTMENT}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.departments;
      },
      providesTags: [TAG_FOUR],
    }),
    getLocationsDropdownForPurchaseOrder: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_LOCATION}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_FOUR],
    }),
    getAllAssetsListForAddInventory: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getAllAssetsListForUpdateInventory: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.DROPDOWN_ALL_ASSETS}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
  }),
});

export const {
  usePostAssetPurchaseOrderMutation,
  useDeletePurchaseOrderMutation,
  useLazyGetDepartmentDropdownQuery,
  useLazyGetLocationsDropdownQuery,
  useGetAddToPurchaseOrderByIdQuery,
  useGetAllAssetsListQuery,
  usePatchAddToPurchaseOrderMutation,
  usePatchAddToItemMutation,
  useGetAddToPurchaseOrderByIdForReceivedItemsQuery,
  useGetPurchaseOrderByIdForAddToInventoryQuery,
  useLazyGetDepartmentDropdownForPurchaseOrderQuery,
  useLazyGetLocationsDropdownForPurchaseOrderQuery,
  useGetAllAssetsListForAddInventoryQuery,
  useGetAllAssetsListForUpdateInventoryQuery,
} = singlePurchaseOrderAPI;
