import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG_TWO = 'LOCATION';
const TAG_THREE = 'VENDOR_DROPDOWN';
const TAG_FOUR = 'DROPDOWN_DEPARTMENT';
const TAG_FIVE = 'PURCHASE_ORDER';
export const purchaseOrderAPI = baseAPI.injectEndpoints({
  endpoints: (builder: any) => ({
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
      providesTags: [TAG_TWO],
    }),
    getVendorDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.VENDOR_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_THREE],
    }),
    getVendorProductsDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.VENDOR_PRODUCT_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.vendorproductcatalogs;
      },
      providesTags: [TAG_THREE],
    }),
    getPurchaseOrderById: builder?.query({
      query: (purchaseOrderId: any) => ({
        url: `${END_POINTS?.PURCHASE_ORDER}/${purchaseOrderId}`,
        method: 'GET',
      }),
      providesTags: [TAG_FIVE],
    }),
    postPurchaseOrder: builder?.mutation({
      query: (postPurchaseOrderParameter: any) => ({
        url: `${END_POINTS?.PURCHASE_ORDER}`,
        method: 'POST',
        body: postPurchaseOrderParameter?.body,
      }),
    }),
    patchPurchaseOrder: builder?.mutation({
      query: (patchPurchaseOrderParameter: any) => ({
        url: `${END_POINTS?.PURCHASE_ORDER}`,
        method: 'PATCH',
        body: patchPurchaseOrderParameter?.body,
      }),
    }),
    deletePurchaseOrder: builder?.mutation({
      query: (id: any) => ({
        url: `${END_POINTS?.PURCHASE_ORDER}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAG_FIVE],
    }),
    getPurchaseOrderList: builder.query({
      query: (params: any) => ({
        url: `${END_POINTS?.PURCHASE_ORDER_LIST}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG_FIVE],
    }),
    putPurchaseOrderStatus: builder?.mutation({
      query: (params: any) => ({
        url: `${END_POINTS?.PURCHASE_ORDER_STATUS}`,
        method: 'PUT',
        params,
      }),
      invalidatesTags: [TAG_FIVE],
    }),
  }),
});

export const {
  useLazyGetDepartmentDropdownQuery,
  useLazyGetLocationsDropdownQuery,
  useLazyGetVendorDropdownQuery,
  useLazyGetVendorProductsDropdownQuery,
  usePostPurchaseOrderMutation,
  usePatchPurchaseOrderMutation,
  useLazyGetPurchaseOrderByIdQuery,
  useDeletePurchaseOrderMutation,
  useGetPurchaseOrderListQuery,
  usePutPurchaseOrderStatusMutation,
} = purchaseOrderAPI;
