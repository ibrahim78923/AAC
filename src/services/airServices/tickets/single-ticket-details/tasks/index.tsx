import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TASK';

export const taskAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getServicesTicketsTaskLists: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.TASK}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    addSingleServicesTasksById: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.TASK}`,
        method: 'POST',
        params: apiDataParameter?.queryParams,
        body: apiDataParameter?.reqBody ?? {},
      }),
      invalidatesTags: [TAG],
    }),
    updateSingleServicesTasksById: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.UPDATE_TASK}`,
        method: 'PATCH',
        params: apiDataParameter?.queryParams,
        body: apiDataParameter?.reqBody ?? {},
      }),
      invalidatesTags: [TAG],
    }),
    deleteServicesTicketTask: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.DELETE_TASKS}`,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
    }),
  }),
});

export const {
  useLazyGetServicesTicketsTaskListsQuery,
  useAddSingleServicesTasksByIdMutation,
  useUpdateSingleServicesTasksByIdMutation,
  useDeleteServicesTicketTaskMutation,
} = taskAPI;
