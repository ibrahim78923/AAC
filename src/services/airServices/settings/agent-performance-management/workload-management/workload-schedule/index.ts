import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'WORKLOAD_SCHEDULE';
const TAG_THREE = 'USERS_DROPDOWN';

export const workloadScheduleAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getAirServicesSettingsWorkloadSchedule: builder?.query({
      query: (getWorkloadScheduleParameter: any) => ({
        url: END_POINTS?.GET_WORKLOAD_SCHEDULE_LIST,
        method: 'GET',
        params: getWorkloadScheduleParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getAirServicesSettingsWorkloadScheduleById: builder?.query({
      query: (getSingleWorkloadScheduleParameter: any) => ({
        url: `${END_POINTS?.GET_SINGLE_WORKLOAD_SCHEDULE_DETAILS}`,
        method: 'GET',
        params: getSingleWorkloadScheduleParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    postAirServicesSettingsWorkloadSchedule: builder?.mutation({
      query: (postWorkloadScheduleParameter: any) => ({
        url: END_POINTS?.ADD_WORKLOAD_SCHEDULE,
        method: 'POST',
        body: postWorkloadScheduleParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    patchAirServicesSettingsWorkloadSchedule: builder?.mutation({
      query: (patchWorkloadScheduleParameter: any) => ({
        url: END_POINTS?.EDIT_WORKLOAD_SCHEDULE,
        method: 'PATCH',
        body: patchWorkloadScheduleParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteAirServicesSettingsWorkloadSchedule: builder?.mutation({
      query: (deleteWorkloadScheduleParameter: any) => ({
        url: END_POINTS?.DELETE_WORKLOAD_SCHEDULE,
        method: 'DELETE',
        params: deleteWorkloadScheduleParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
    getAirServicesSettingsWorkloadAgentDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.DROPDOWN_USERS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_THREE],
    }),
    getAirServicesSettingsBusinessHourDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_BUSINESS_HOUR}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG],
    }),
  }),
});

export const {
  usePostAirServicesSettingsWorkloadScheduleMutation,
  useGetAirServicesSettingsWorkloadScheduleQuery,
  usePatchAirServicesSettingsWorkloadScheduleMutation,
  useDeleteAirServicesSettingsWorkloadScheduleMutation,
  useGetAirServicesSettingsWorkloadScheduleByIdQuery,
  useLazyGetAirServicesSettingsBusinessHourDropdownQuery,
  useLazyGetAirServicesSettingsWorkloadAgentDropdownQuery,
} = workloadScheduleAPI;
