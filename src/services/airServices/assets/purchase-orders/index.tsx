import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG_TWO = 'LOCATION';
const TAG_THREE = 'VENDOR_DROPDOWN';
const TAG_FOUR = 'DROPDOWN_DEPARTMENT';
const TAG_FIVE = 'PURCHASE_ORDER';

export const purchaseOrderAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getAirServicesAssetsPurchaseOrderDepartmentDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.DROPDOWN_DEPARTMENT,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.departments;
      },
      providesTags: [TAG_FOUR],
    }),

    getAirServicesAssetsPurchaseOrderLocationsDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.DROPDOWN_LOCATION,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_TWO],
    }),

    getAirServicesAssetsPurchaseOrderVendorDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.VENDOR_DROPDOWN,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_THREE],
    }),

    getAirServicesAssetsPurchaseOrderVendorProductsDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.VENDOR_PRODUCT_DROPDOWN,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.vendorproductcatalogs;
      },
      providesTags: [TAG_THREE],
    }),

    getAirServicesAssetsPurchaseOrderById: builder?.query({
      query: (purchaseOrderId: any) => ({
        url: `${END_POINTS?.PURCHASE_ORDER}/${purchaseOrderId}`,
        method: 'GET',
      }),
      providesTags: [TAG_FIVE],
    }),

    postAirServicesAssetsPurchaseOrder: builder?.mutation({
      query: (postPurchaseOrderParameter: any) => ({
        url: END_POINTS?.PURCHASE_ORDER,
        method: 'POST',
        body: postPurchaseOrderParameter?.body,
      }),
    }),

    patchAirServicesAssetsPurchaseOrder: builder?.mutation({
      query: (patchPurchaseOrderParameter: any) => ({
        url: END_POINTS?.PURCHASE_ORDER,
        method: 'PATCH',
        body: patchPurchaseOrderParameter?.body,
      }),
    }),

    deleteAirServicesAssetsPurchaseOrderPurchaseOrder: builder?.mutation({
      query: (id: any) => ({
        url: `${END_POINTS?.PURCHASE_ORDER}/${id}`,
        method: 'DELETE',
      }),
    }),

    getAirServicesAssetsPurchaseOrderList: builder.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.PURCHASE_ORDER_LIST}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG_FIVE],
    }),

    putAirServicesAssetsPurchaseOrderStatus: builder?.mutation({
      query: (params: any) => ({
        url: `${END_POINTS?.PURCHASE_ORDER_STATUS}`,
        method: 'PUT',
        params,
      }),
      invalidatesTags: [TAG_FIVE],
    }),

    getAirServicesAssetsExportPurchaseOrderList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.PURCHASE_ORDER_LIST}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
    }),

    getAirServicesAssetsPurchaseOrderStatusById: builder?.query({
      query: (purchaseOrderId: any) => ({
        url: `${END_POINTS?.PURCHASE_ORDER}/${purchaseOrderId}`,
        method: 'GET',
      }),
      providesTags: [TAG_FIVE],
    }),
  }),
});

export const {
  useLazyGetAirServicesAssetsPurchaseOrderDepartmentDropdownQuery,
  useLazyGetAirServicesAssetsPurchaseOrderLocationsDropdownQuery,
  useLazyGetAirServicesAssetsPurchaseOrderVendorDropdownQuery,
  useLazyGetAirServicesAssetsPurchaseOrderVendorProductsDropdownQuery,
  usePostAirServicesAssetsPurchaseOrderMutation,
  usePatchAirServicesAssetsPurchaseOrderMutation,
  useGetAirServicesAssetsPurchaseOrderByIdQuery,
  useDeleteAirServicesAssetsPurchaseOrderPurchaseOrderMutation,
  usePutAirServicesAssetsPurchaseOrderStatusMutation,
  useLazyGetAirServicesAssetsPurchaseOrderListQuery,
  useLazyGetAirServicesAssetsExportPurchaseOrderListQuery,
  useGetAirServicesAssetsPurchaseOrderStatusByIdQuery,
} = purchaseOrderAPI;
