import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TASK';
const TAG_ONE = 'DROPDOWN_DEPARTMENT';
const TAG_TWO = 'DROPDOWN_AGENT_LIST';

export const taskAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getTaskById: builder?.query({
      query: (item: any) => ({
        url: `${END_POINTS?.TASK}?ticketId=${item?.id}`,
        method: 'GET',
        params: item?.queryParams,
      }),
      providesTags: [TAG],
    }),
    patchTaskById: builder?.mutation({
      query: (item: any) => ({
        url: `${END_POINTS?.TASK}/${item?.id}`,
        method: 'PATCH',
        params: item?.data,
      }),
      invalidatesTags: [TAG],
    }),
    postTaskById: builder?.mutation({
      query: (params: any) => ({
        url: `${END_POINTS?.TASK}`,
        method: 'POST',
        params: params,
      }),
      invalidatesTags: [TAG],
    }),
    deleteTask: builder.mutation({
      query: (params: any) => ({
        url: `${END_POINTS?.TASK}/id`,
        method: 'DELETE',
        params,
      }),
      invalidatesTags: [TAG],
    }),
    getDepartmentDropdownList: builder?.query({
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
    getAgentsDropdownList: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_AGENTS_LIST}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_TWO],
    }),
  }),
});

export const {
  useLazyGetTaskByIdQuery,
  usePatchTaskByIdMutation,
  usePostTaskByIdMutation,
  useDeleteTaskMutation,
  useLazyGetDepartmentDropdownListQuery,
  useLazyGetAgentsDropdownListQuery,
} = taskAPI;
