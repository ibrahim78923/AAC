import { END_POINTS, OPERATION } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
import { transformResponse } from '@/utils/api';

const TAG = 'SERVICES_WORKFLOWS';
const TEST_TAG = 'TEST_WORKFLOWS';
const TAG_ONE = 'DROPDOWN_DEPARTMENT';
const TAG_TWO = 'DROPDOWN_CATEGORIES';
const TAG_THREE = 'LOCATION_DROPDOWN';
const TAG_FOUR = 'DROPDOWN_REQUESTER';
const TAG_FIVE = 'DROPDOWN_ASSET_TYPE_LIST';
const TAG_SIX = 'USER_LIST_DROPDOWN';
const TAG_SEVEN = 'DROPDOWN_AGENTS';

const { OPERATION_WORKFLOW, SAVE_WORKFLOW, CLONE_WORKFLOW, TEST_WORKFLOW } =
  OPERATION;

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
      providesTags: [TAG_ONE],
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
      providesTags: [TAG_TWO],
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
      providesTags: [TAG_THREE],
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
      providesTags: [TAG_FOUR],
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
      providesTags: [TAG_FOUR],
    }),
    getAssetTypeInWorkflow: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_ASSET_TYPE_LIST}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => transformResponse(response),
      providesTags: [TAG_FIVE],
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
      providesTags: [TAG_SIX],
    }),
    getAgentsDropDownInWorkflow: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.AGENTS_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => transformResponse(response),
      providesTags: [TAG_SEVEN],
    }),
  }),
});

export const {
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
} = servicesWorkflowAPI;
