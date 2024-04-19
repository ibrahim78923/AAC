import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['TASKS'];
const TAG_TWO = ['TASK_USERS'];
const TAG_THREE = ['TASK_USERS_ASSIGNEE'];

const transformResponse = (response: any) => {
  if (response) return response?.data?.users;
};

export const taskApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.TASK_MANAGEMENT}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getCreateTaskContacts: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.CONTACTS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
    getCreateTaskCompanies: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.COMPANY}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
    getCreateTaskDeals: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DEALS_LIST_VIEW}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
    getCreateTaskTickets: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    postCreateTask: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.TASK_MANAGEMENT}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
    patchCreateTask: builder.mutation({
      query: ({ body, id }: any) => ({
        url: `${END_POINTS?.TASK_MANAGEMENT}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    getTaskDetails: builder.query({
      query: ({ id }: any) => ({
        url: `${END_POINTS?.TASK_MANAGEMENT}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    deleteTasks: builder.mutation({
      query: ({ id }: any) => ({
        url: `${END_POINTS?.TASK_MANAGEMENT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),

    patchCreateTaskStatus: builder.mutation({
      query: ({ body, id }: any) => ({
        url: `${END_POINTS?.TASK_MANAGEMENT}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    getTaskColumns: builder.query({
      query: ({ type }: any) => ({
        url: `${END_POINTS?.TASK_CUSTOMIZE_COLUMN}?type=${type}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    putTaskCustomizedColumns: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.CUSTOMIZE_COLUMNS}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: TAG,
    }),

    getTaskInsights: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.TASK_MANAGEMENT_INSIGHTS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getTaskGraphData: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.TASK_MANAGEMENT_INSIGHTS_NEW}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getTaskFeed: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.TASK_MANAGEMENT_FEED}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
    getAssignedToUsers: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.USER_LIST}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG_TWO,
    }),
    getAssignedUsers: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.USER_LIST}`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response: any) => transformResponse(response),
      providesTags: TAG_THREE,
    }),
  }),
});

export const {
  useGetTasksQuery,
  usePostCreateTaskMutation,
  useGetCreateTaskContactsQuery,
  useGetCreateTaskCompaniesQuery,
  useGetCreateTaskDealsQuery,
  useGetCreateTaskTicketsQuery,
  useGetTaskDetailsQuery,
  useDeleteTasksMutation,
  usePatchCreateTaskMutation,
  usePatchCreateTaskStatusMutation,
  useGetTaskColumnsQuery,
  usePutTaskCustomizedColumnsMutation,
  useGetTaskInsightsQuery,
  useGetTaskFeedQuery,
  useGetTaskGraphDataQuery,
  useGetAssignedToUsersQuery,
  useLazyGetAssignedUsersQuery,
} = taskApi;
