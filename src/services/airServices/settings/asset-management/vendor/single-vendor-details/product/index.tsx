import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'VENDOR_PRODUCT_DETAIL';

const transformResponse = (response: any) => {
  if (response) return response?.data?.productcatalogs;
};

export const vendorsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getProductVendorList: builder?.query({
      query: ({ param }) => ({
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
      query: ({ param }) => ({
        url: `${END_POINTS?.GET_PRODUCT_VENDOR_DROPDOWN}`,
        method: 'GET',
        params: param,
      }),
      transformResponse: (response: any) => transformResponse(response),
      providesTags: [TAG],
    }),
  }),
});

export const {
  useGetProductVendorListQuery,
  usePostProductVendorMutation,
  usePutProductVendorMutation,
  useLazyGetProductVendorDropdownQuery,
} = vendorsAPI;
