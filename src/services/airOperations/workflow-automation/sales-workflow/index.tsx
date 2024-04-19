import { END_POINTS, OPERATION } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
import { transformResponse } from '@/utils/api';

const TAG = 'WORKFLOWS';
const TAG_ONE = 'DROPDOWNS';
export const salesWorkflowAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getWorkflowList: builder?.query({
      query: (params) => ({
        url: `${OPERATION?.OPERATION_WORKFLOW}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    deleteWorkflow: builder?.mutation({
      query: (params) => ({
        url: `${OPERATION?.OPERATION_WORKFLOW}`,
        method: 'DELETE',
        params,
      }),
      invalidatesTags: [TAG],
    }),
    changeStatusWorkflow: builder?.mutation({
      query: ({ id, body }) => ({
        url: `${OPERATION?.STATUS_WORKFLOW}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    postSalesWorkflow: builder?.mutation({
      query: (body) => ({
        url: OPERATION?.OPERATION_WORKFLOW,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    postSaveDraftWorkflow: builder?.mutation({
      query: (body) => ({
        url: OPERATION?.SAVE_WORKFLOW,
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
    getUserDropdownList: builder?.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse,
      providesTags: [TAG_ONE],
    }),
    cloneWorkflow: builder?.mutation({
      query: (id) => ({
        url: `${OPERATION?.CLONE_WORKFLOW}/${id}`,
        method: 'POST',
      }),
      invalidatesTags: [TAG],
    }),
    getLifeCycleStagesDropdownList: builder?.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.DEALS_LIFECYCLE_STAGES}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.lifecycleStages;
      },
      providesTags: [TAG_ONE],
    }),
  }),
});

export const {
  useLazyGetWorkflowListQuery,
  useDeleteWorkflowMutation,
  useChangeStatusWorkflowMutation,
  usePostSalesWorkflowMutation,
  useLazyGetDealDropdownListQuery,
  useLazyGetContactDropdownListQuery,
  useLazyGetProductsDropdownListQuery,
  usePostSaveDraftWorkflowMutation,
  useLazyGetUserDropdownListQuery,
  useCloneWorkflowMutation,
  useLazyGetLifeCycleStagesDropdownListQuery,
} = salesWorkflowAPI;
