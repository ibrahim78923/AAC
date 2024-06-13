import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TASK';

export const taskAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getTaskById: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.TASK}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    patchTaskById: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.UPDATE_TASK}`,
        method: 'PATCH',
        params: apiDataParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),

    postTaskById: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.TASK}`,
        method: 'POST',
        params: apiDataParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
    deleteTask: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.DELETE_TASKS}`,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
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
    }),
    getUsersDropdownList: builder?.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.DROPDOWN_ALL_AGENTS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    getDepartmentDropdownListForTicketTasks: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_DEPARTMENT}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.departments;
      },
    }),
    getUsersDropdownListForTicketTasks: builder?.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.DROPDOWN_ALL_AGENTS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
  }),
});

export const {
  useLazyGetTaskByIdQuery,
  usePatchTaskByIdMutation,
  usePostTaskByIdMutation,
  useDeleteTaskMutation,
  useLazyGetDepartmentDropdownListQuery,
  useLazyGetUsersDropdownListQuery,
  useLazyGetDepartmentDropdownListForTicketTasksQuery,
  useLazyGetUsersDropdownListForTicketTasksQuery,
} = taskAPI;
