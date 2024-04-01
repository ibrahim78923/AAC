import { OPERATION } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'WORKFLOWS';
const { OPERATION_WORKFLOW, SAVE_WORKFLOW, CLONE_WORKFLOW } = OPERATION;
export const servicesWorkflowAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    postServicesWorkflow: builder?.mutation({
      query: (body: any) => ({
        url: `${OPERATION_WORKFLOW}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    getByIdWorkflow: builder?.query({
      query: (id: any) => ({
        url: `${OPERATION_WORKFLOW}/${id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    deleteWorkflow: builder?.mutation({
      query: (params: any) => {
        const selectedId = params?.ids.join('&ids=');
        return {
          url: `${OPERATION_WORKFLOW}?ids=${selectedId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [TAG],
    }),
    updateWorkflow: builder?.mutation({
      query: (body: any) => ({
        url: `${OPERATION_WORKFLOW}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    saveWorkflow: builder?.mutation({
      query: (body: any) => ({
        url: `${SAVE_WORKFLOW}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    cloneServicesWorkflow: builder?.mutation({
      query: (id: any) => ({
        url: `${CLONE_WORKFLOW}/${id}`,
        method: 'POST',
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  usePostServicesWorkflowMutation,
  useGetByIdWorkflowQuery,
  useDeleteWorkflowMutation,
  useUpdateWorkflowMutation,
  useSaveWorkflowMutation,
  useCloneServicesWorkflowMutation,
} = servicesWorkflowAPI;
