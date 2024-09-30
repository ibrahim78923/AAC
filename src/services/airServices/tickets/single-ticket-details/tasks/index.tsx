import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TASK';

const { TASK, UPDATE_TASK, DELETE_TASKS } = END_POINTS ?? {};

export const taskAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getServicesTicketsTaskLists: builder?.query({
      query: (apiDataParameter: any) => ({
        url: TASK,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getServicesTicketsTaskListAsExport: builder?.query({
      query: (apiDataParameter: any) => ({
        url: TASK,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
    }),
    addSingleServicesTasksById: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: TASK,
        method: 'POST',
        params: apiDataParameter?.queryParams,
        body: apiDataParameter?.reqBody ?? {},
      }),
      invalidatesTags: [TAG],
    }),
    updateSingleServicesTasksById: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: UPDATE_TASK,
        method: 'PATCH',
        params: apiDataParameter?.queryParams,
        body: apiDataParameter?.reqBody ?? {},
      }),
      invalidatesTags: [TAG],
    }),
    deleteServicesTicketTask: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: DELETE_TASKS,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
    }),
  }),
});

export const {
  useLazyGetServicesTicketsTaskListsQuery,
  useLazyGetServicesTicketsTaskListAsExportQuery,
  useAddSingleServicesTasksByIdMutation,
  useUpdateSingleServicesTasksByIdMutation,
  useDeleteServicesTicketTaskMutation,
} = taskAPI;
