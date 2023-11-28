import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const exampleExampleAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDealsTasksManagement: builder.query({
      query: () => ({
        // todo: pagination will be implemented at the end .
        url: `${END_POINTS?.TASK_MANAGEMENT}?page=1&limit=100`,
        method: 'GET',
      }),
      providesTags: ['DEALS_TASK_MANAGEMENT'],
    }),
    postDealsTasksManagement: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.TASK_MANAGEMENT,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['DEALS_TASK_MANAGEMENT'],
    }),
    updateDealsTasksManagement: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.TASK_MANAGEMENT}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['DEALS_TASK_MANAGEMENT'],
    }),
    deleteDealsTasksManagement: builder.mutation({
      query: ({ id }: any) => ({
        url: `${END_POINTS?.TASK_MANAGEMENT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['DEALS_TASK_MANAGEMENT'],
    }),
  }),
});

export const {
  useGetDealsTasksManagementQuery,
  usePostDealsTasksManagementMutation,
  useUpdateDealsTasksManagementMutation,
  useDeleteDealsTasksManagementMutation,
} = exampleExampleAPI;
