import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG_TWO = 'LOCATION';
const TAG_THREE = 'VENDOR_DROPDOWN';
const TAG_FOUR = 'DROPDOWN_DEPARTMENT';
export const purchaseOrderAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
  useLazyGetDepartmentDropdownQuery,
  useLazyGetLocationsDropdownQuery,
  useLazyGetVendorDropdownQuery,
  useLazyGetVendorProductsDropdownQuery,
} = purchaseOrderAPI;
