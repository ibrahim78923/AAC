import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'ASSETS_PURCHASEORDER';
const TAG_FIVE = 'ASSETS_ITEM_ADDED';
const TAG_THREE = 'PURCHASE_ORDER';

export const singlePurchaseOrderAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getAirServicesPurchaseOrderDetailsDepartmentDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.DROPDOWN_DEPARTMENT,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.departments;
      },
    }),

    getAirServicesPurchaseOrderDetailsLocationsDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.DROPDOWN_LOCATION,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),

    postAirServicesAssetsPurchaseOrderDetails: builder?.mutation({
      query: (postPurchaseOrderParameter: any) => ({
        url: END_POINTS?.ASSETS_PURCHASEORDER,
        method: 'POST',
        body: postPurchaseOrderParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),

    getAirServicesAssetsPurchaseOrderAllAssetsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.ASSETS_INVENTORY,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),

    getAirServicesAssetsPurchaseOrderDetailsById: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.ASSETS_PURCHASEORDER_DETAIL}/${apiDataParameter?.pathParams?.purchaseOrderId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),

    patchAirServicesAssetsPurchaseOrderDetailsAddToPurchaseOrder:
      builder?.mutation({
        query: (putAddToPurchaseOrderParameter: any) => ({
          url: END_POINTS?.EDIT_NEW_PURCHASEORDER,
          method: 'PATCH',
          body: putAddToPurchaseOrderParameter?.body,
        }),
        invalidatesTags: [TAG],
      }),

    patchAirServicesAssetsPurchaseOrderDetailsAddToItem: builder?.mutation({
      query: (putAddToItemParameter: any) => ({
        url: END_POINTS?.EDIT_NEW_ITEM,
        method: 'PATCH',
        body: putAddToItemParameter?.body,
      }),
      invalidatesTags: [TAG_FIVE, TAG_THREE],
    }),

    getAirServicesAssetsPurchaseOrderDetailsAddToReceivedItems: builder?.query({
      query: (getSingleAddToPurchaseOrderParameter: any) => ({
        url: `${END_POINTS?.ASSETS_PURCHASEORDER_DETAIL}/${getSingleAddToPurchaseOrderParameter?.pathParam?.purchaseOrderId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
  }),
});

export const {
  useLazyGetAirServicesPurchaseOrderDetailsDepartmentDropdownQuery,
  useLazyGetAirServicesPurchaseOrderDetailsLocationsDropdownQuery,
  usePostAirServicesAssetsPurchaseOrderDetailsMutation,
  useGetAirServicesAssetsPurchaseOrderAllAssetsListQuery,
  useGetAirServicesAssetsPurchaseOrderDetailsByIdQuery,
  usePatchAirServicesAssetsPurchaseOrderDetailsAddToPurchaseOrderMutation,
  usePatchAirServicesAssetsPurchaseOrderDetailsAddToItemMutation,
  useGetAirServicesAssetsPurchaseOrderDetailsAddToReceivedItemsQuery,
} = singlePurchaseOrderAPI;
