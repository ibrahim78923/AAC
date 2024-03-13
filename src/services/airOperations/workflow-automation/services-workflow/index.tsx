import { OPERATION } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'SERVICES_WORKFLOW';
const { ADD_OPERATION_WORKFLOW } = OPERATION;
export const servicesWorkflowAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    postServicesWorkflow: builder?.mutation({
      query: (body: any) => ({
        url: `${ADD_OPERATION_WORKFLOW}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const { usePostServicesWorkflowMutation } = servicesWorkflowAPI;
