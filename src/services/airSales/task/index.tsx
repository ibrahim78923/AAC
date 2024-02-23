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
        url: `/contact`,
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
  }),
});

export const {
  useGetTasksQuery,
  usePostCreateTaskMutation,
  useGetCreateTaskContactsQuery,
} = taskApi;
