import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'WORKLOAD_SCHEDULE';
const TAG_FOUR = 'USERS_DROPDOWN';

export const exampleExampleAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getWorkloadSchedule: builder.query({
      query: (getWorkloadScheduleParameter: any) => ({
        url: `/plan-management`,
        method: 'GET',
        params: getWorkloadScheduleParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getWorkloadScheduleById: builder.query({
      query: (getSingleWorkloadScheduleParameter: any) => ({
        url: `/plan-management/${getSingleWorkloadScheduleParameter?.pathParams?.id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    postWorkloadSchedule: builder.mutation({
      query: (postWorkloadScheduleParameter: any) => ({
        url: END_POINTS?.ADD_WORKLOAD_SCHEDULE,
        method: 'POST',
        body: postWorkloadScheduleParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    patchWorkloadSchedule: builder.mutation({
      query: (patchWorkloadScheduleParameter: any) => ({
        url: END_POINTS?.EDIT_WORKLOAD_SCHEDULE,
        method: 'PUT',
        body: patchWorkloadScheduleParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteWorkloadSchedule: builder.mutation({
      query: (deleteWorkloadScheduleParameter: any) => ({
        url: END_POINTS?.DELETE_WORKLOAD_SCHEDULE,
        method: 'DELETE',
        params: deleteWorkloadScheduleParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
    getUsersDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_FOUR],
    }),
    getBusinessHourDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_BUSINESS_HOUR}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const {
  usePostWorkloadScheduleMutation,
  useGetWorkloadScheduleQuery,
  usePatchWorkloadScheduleMutation,
  useDeleteWorkloadScheduleMutation,
  useGetWorkloadScheduleByIdQuery,
  useLazyGetBusinessHourDropdownQuery,
  useLazyGetUsersDropdownQuery,
} = exampleExampleAPI;
