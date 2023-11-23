import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const exampleExampleAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDealsTasks: builder.query({
      query: () => ({
        url: `${END_POINTS?.TASK}`,
        method: 'GET',
      }),
      providesTags: ['DEALS_TASK'],
    }),
    postDealsTasks: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.TASK,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['DEALS_TASK'],
    }),
    updateDealsTasks: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.TASK}/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['DEALS_TASK'],
    }),
    deleteDealsTasks: builder.mutation({
      query: ({ id }: any) => ({
        url: `${END_POINTS?.TASK}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['DEALS_TASK'],
    }),
  }),
});

export const {
  useGetDealsTasksQuery,
  usePostDealsTasksMutation,
  useUpdateDealsTasksMutation,
  useDeleteDealsTasksMutation,
} = exampleExampleAPI;
