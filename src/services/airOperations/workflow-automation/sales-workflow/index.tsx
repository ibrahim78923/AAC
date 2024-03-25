import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
import { transformResponse } from '@/utils/api';

const TAG = 'WORKFLOWS';
const TAG_ONE = 'CONTACTS';
export const salesWorkflowAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getWorkflowList: builder?.query({
      query: (params) => ({
        url: `${END_POINTS?.WORKFLOWS}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    postSalesWorkflow: builder?.mutation({
      query: (body) => ({
        url: END_POINTS?.WORKFLOWS,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    getDealDropdownList: builder?.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.DEALS_PIPELINE}`,
        method: 'GET',
        params,
      }),
      transformResponse,
      providesTags: [TAG_ONE],
    }),
    getContactDropdownList: builder?.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.CONTACTS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.contacts;
      },
      providesTags: [TAG_ONE],
    }),
    getProductsDropdownList: builder?.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.SALE_PRODUCTS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.salesproducts;
      },
      providesTags: [TAG_ONE],
    }),
  }),
});

export const {
  useLazyGetWorkflowListQuery,
  usePostSalesWorkflowMutation,
  useLazyGetDealDropdownListQuery,
  useLazyGetContactDropdownListQuery,
  useLazyGetProductsDropdownListQuery,
} = salesWorkflowAPI;
