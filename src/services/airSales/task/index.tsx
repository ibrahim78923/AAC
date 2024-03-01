import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['TASKS'];
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

    getTaskDetails: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
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
} = taskApi;
