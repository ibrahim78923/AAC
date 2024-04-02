import { END_POINTS, OPERATION } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'WORKFLOWS';
const TAG_ONE = 'DROPDOWN_DEPARTMENT';
const TAG_TWO = 'DROPDOWN_CATEGORIES';
const TAG_THREE = 'LOCATION_DROPDOWN';
const TAG_FOUR = 'DROPDOWN_REQUESTER';

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
    getDepartmentDropdown: builder?.query({
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
    getCategoriesDropdown: builder?.query({
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
    getLocationsDropdown: builder?.query({
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
    getRequesterDropdown: builder?.query({
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
  }),
});

export const {
  usePostServicesWorkflowMutation,
  useGetByIdWorkflowQuery,
  useDeleteWorkflowMutation,
  useUpdateWorkflowMutation,
  useSaveWorkflowMutation,
  useCloneServicesWorkflowMutation,
  useLazyGetDepartmentDropdownQuery,
  useLazyGetCategoriesDropdownQuery,
  useLazyGetLocationsDropdownQuery,
  useLazyGetRequesterDropdownQuery,
} = servicesWorkflowAPI;
