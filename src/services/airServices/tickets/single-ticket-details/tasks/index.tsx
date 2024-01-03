import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TASK';
const TAG_ONE = 'DROPDOWN_DEPARTMENT';

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
      providesTags: [TAG_ONE],
    }),
  }),
});

export const {
  useLazyGetTaskByIdQuery,
  usePatchTaskByIdMutation,
  usePostTaskByIdMutation,
  useLazyGetDepartmentDropdownListQuery,
  useLazyGetAgentsDropdownListQuery,
} = taskAPI;
