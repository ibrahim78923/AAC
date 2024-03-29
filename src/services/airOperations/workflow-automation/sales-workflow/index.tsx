import { OPERATION } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'WORKFLOWS';
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
  }),
});

export const {
  useLazyGetWorkflowListQuery,
  useDeleteWorkflowMutation,
  useChangeStatusWorkflowMutation,
} = salesWorkflowAPI;
