import { baseAPI } from '@/services/base-api';

export const settingsJobsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => ({
        url: `/jobs`,
        method: 'GET',
      }),
      providesTags: ['SETTINGS_JOBS'],
    }),

    getJobById: builder.query({
      query: ({ id }: any) => ({
        url: `/jobs/${id}`,
        method: 'GET',
      }),
      providesTags: ['SETTINGS_JOBS'],
    }),

    postJob: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `/jobs/${id}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['SETTINGS_JOBS'],
    }),

    updateJob: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `/JOBS/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['SETTINGS_JOBS'],
    }),

    deleteJob: builder.mutation({
      query: ({ id }: any) => ({
        url: `/JOBS/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SETTINGS_JOBS'],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useUpdateJobMutation,
  usePostJobMutation,
  useDeleteJobMutation,
} = settingsJobsAPI;
