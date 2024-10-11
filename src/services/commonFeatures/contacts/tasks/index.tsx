import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const contactTasksAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getContactTasks: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.TASK_MANAGEMENT,
        method: 'GET',
        params: params,
      }),
      providesTags: ['CONTACT_TASKS'],
    }),

    deleteContactTasks: builder.mutation({
      query: (ids: any) => ({
        url: `${END_POINTS?.TASK_MANAGEMENT}/${ids}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CONTACT_TASKS'],
    }),
  }),
});

export const { useGetContactTasksQuery, useDeleteContactTasksMutation } =
  contactTasksAPI;
