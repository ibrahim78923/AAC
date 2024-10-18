import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
import { transformResponse } from '@/utils/api';

const TAG = 'VENDOR_PRODUCT_DETAIL';

export const vendorsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getProductVendorList: builder?.query({
      query: (param: any) => ({
        url: `${END_POINTS?.GET_PRODUCT_VENDOR_LIST}`,
        method: 'GET',
        params: param,
      }),
      providesTags: [TAG],
    }),
    postProductVendor: builder?.mutation({
      query: (param) => ({
        url: `${END_POINTS?.POST_PRODUCT_VENDOR}`,
        method: 'POST',
        body: param,
      }),
      invalidatesTags: [TAG],
    }),
    putProductVendor: builder?.mutation({
      query: (param) => ({
        url: `${END_POINTS?.PUT_PRODUCT_VENDOR}`,
        method: 'PATCH',
        body: param,
      }),
      invalidatesTags: [TAG],
    }),
    getProductVendorDropdown: builder?.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.GET_PRODUCT_VENDOR_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse,
      providesTags: [TAG],
    }),
    deleteProductVendor: builder?.mutation({
      query: (param: any) => ({
        url: `${END_POINTS?.DELETE_PRODUCT_CATALOG_VENDOR}`,
        method: 'DELETE',
        params: param?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetProductVendorListQuery,
  usePostProductVendorMutation,
  usePutProductVendorMutation,
  useLazyGetProductVendorDropdownQuery,
  useDeleteProductVendorMutation,
} = vendorsAPI;
