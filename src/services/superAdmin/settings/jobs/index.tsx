import { baseAPI } from '@/services/base-api';
import { SUPER_ADMIN_SETTINGS } from '@/routesConstants/paths';

const TAG = ['SETTINGS_JOBS'];
export const settingsJobsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: ({ params }) => ({
        url: SUPER_ADMIN_SETTINGS.JOBS,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getJobById: builder.query({
      query: (id: any) => ({
        url: `${SUPER_ADMIN_SETTINGS.JOBS}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    postJob: builder.mutation({
      query: ({ body }: any) => ({
        url: SUPER_ADMIN_SETTINGS.JOBS,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    updateJob: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${SUPER_ADMIN_SETTINGS.JOBS}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    deleteJob: builder.mutation({
      query: (id: any) => ({
        url: `${SUPER_ADMIN_SETTINGS.JOBS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
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
