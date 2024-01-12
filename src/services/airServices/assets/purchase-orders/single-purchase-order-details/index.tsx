import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'ASSETS_PURCHASEORDER';
const TAG_FOUR = 'DROPDOWN_DEPARTMENT';
const TAG_TWO = 'DROPDOWN_ALL_ASSETS';
export const singlePurchaseOrderAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    postPurchaseOrder: builder?.mutation({
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
  }),
});

export const {
  usePostPurchaseOrderMutation,
  useDeletePurchaseOrderMutation,
  useLazyGetDepartmentDropdownQuery,
  useLazyGetLocationsDropdownQuery,
  useGetAddToPurchaseOrderByIdQuery,
  useGetAllAssetsListQuery,
  usePatchAddToPurchaseOrderMutation,
} = singlePurchaseOrderAPI;
