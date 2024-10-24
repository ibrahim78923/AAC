import { END_POINTS, OPERATION } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
import { transformResponse } from '@/utils/api';

const TAG = 'SERVICES_WORKFLOWS';
const TEST_TAG = 'TEST_WORKFLOWS';

const { OPERATION_WORKFLOW, SAVE_WORKFLOW, CLONE_WORKFLOW, TEST_WORKFLOW } =
  OPERATION;

export const servicesWorkflowAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getServicesWorkflowList: builder?.query({
      query: (params: any) => ({
        url: `${OPERATION?.OPERATION_WORKFLOW}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    changeStatusServicesWorkflow: builder?.mutation({
      query: ({ id, body }: any) => ({
        url: `${OPERATION?.STATUS_WORKFLOW}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    postServicesWorkflow: builder?.mutation({
      query: (body: any) => ({
        url: `${OPERATION_WORKFLOW}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    postTestWorkflow: builder?.mutation({
      query: (body: any) => ({
        url: `${TEST_WORKFLOW}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TEST_TAG],
    }),
    getByIdWorkflow: builder?.query({
      query: (id: any) => ({
        url: `${OPERATION_WORKFLOW}/${id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    deleteServicesWorkflow: builder?.mutation({
      query: (params: any) => ({
        url: `${OPERATION?.OPERATION_WORKFLOW}`,
        method: 'DELETE',
        params,
      }),
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
    getDepartmentDropdownInWorkflow: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_DEPARTMENT}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.departments;
      },
    }),
    getCategoriesDropdownInWorkflow: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_CATEGORIES}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.servicecategories;
      },
    }),
    getLocationsDropdownInWorkflow: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_LOCATION}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    getRequesterDropdownInWorkflow: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_REQUESTERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.users;
      },
    }),
    getAgentDropdownInWorkflow: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_AGENTS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.users;
      },
    }),
    getAssetTypeInWorkflow: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_ASSET_TYPE_LIST}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => transformResponse(response),
    }),
    getUsersListDropdownInWorkflow: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    getAgentsDropDownInWorkflow: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.AGENTS_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => transformResponse(response),
    }),
  }),
});

export const {
  useLazyGetServicesWorkflowListQuery,
  usePostServicesWorkflowMutation,
  useGetByIdWorkflowQuery,
  useDeleteServicesWorkflowMutation,
  useUpdateWorkflowMutation,
  useSaveWorkflowMutation,
  useCloneServicesWorkflowMutation,
  useLazyGetDepartmentDropdownInWorkflowQuery,
  useLazyGetCategoriesDropdownInWorkflowQuery,
  useLazyGetLocationsDropdownInWorkflowQuery,
  useLazyGetRequesterDropdownInWorkflowQuery,
  usePostTestWorkflowMutation,
  useLazyGetAssetTypeInWorkflowQuery,
  useLazyGetUsersListDropdownInWorkflowQuery,
  useLazyGetAgentDropdownInWorkflowQuery,
  useLazyGetAgentsDropDownInWorkflowQuery,
  useChangeStatusServicesWorkflowMutation,
} = servicesWorkflowAPI;
