import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'SALES_WORKFLOW';
export const salesWorkflowApi = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    postSalesWorkflow: builder?.mutation({
      query: (body) => ({
        url: END_POINTS?.SALES_WORKFLOW,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const { usePostSalesWorkflowMutation } = salesWorkflowApi;
