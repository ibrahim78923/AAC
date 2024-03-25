import { OPERATION } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'SERVICES_WORKFLOW';
const { OPERATION_WORKFLOW } = OPERATION;
export const servicesWorkflowAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    postServicesWorkflow: builder?.mutation({
      query: (body: any) => ({
        url: `${OPERATION_WORKFLOW}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    getWorkflow: builder?.query({
      query: (queryParams: any) => ({
        url: `${OPERATION_WORKFLOW}`,
        method: 'GET',
        params: queryParams,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { usePostServicesWorkflowMutation, useGetWorkflowQuery } =
  servicesWorkflowAPI;
