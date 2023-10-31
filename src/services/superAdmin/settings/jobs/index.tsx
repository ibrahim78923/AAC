import { baseAPI } from '@/services/base-api';
import { SETTINGS_API } from '@/routesConstants/paths';

export const settingsJobsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (params) => ({
        url: SETTINGS_API.jobs,
        method: 'GET',
        params: params,
      }),
      providesTags: ['SETTINGS_JOBS'],
    }),

    getJobById: builder.query({
      query: ({ id }: any) => ({
        url: `${SETTINGS_API.jobs}/${id}`,
        method: 'GET',
      }),
      providesTags: ['SETTINGS_JOBS'],
    }),

    postJob: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${SETTINGS_API.jobs}/${id}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['SETTINGS_JOBS'],
    }),

    updateJob: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${SETTINGS_API.jobs}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['SETTINGS_JOBS'],
    }),

    deleteJob: builder.mutation({
      query: ({ id }: any) => ({
        url: `${SETTINGS_API.jobs}/${id}`,
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
