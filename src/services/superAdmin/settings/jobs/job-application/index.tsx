import { baseAPI } from '@/services/base-api';
import { SUPER_ADMIN_SETTINGS } from '@/routesConstants/paths';

const TAG = ['SETTINGS_JOB_APPLICATION'];
export const settingsJobAppsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getJobApps: builder.query({
      query: (params) => ({
        url: SUPER_ADMIN_SETTINGS.JOB_APPLICATIONS,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getUniqueCandidate: builder.query({
      query: () => ({
        url: SUPER_ADMIN_SETTINGS.UNIQUE_CANDIDATE,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    // getJobById: builder.query({
    //   query: (id: any) => ({
    //     url: `${SUPER_ADMIN_SETTINGS.JOB_APPLICATIONS}/${id}`,
    //     method: 'GET',
    //   }),
    //   providesTags: TAG,
    // }),

    // postJob: builder.mutation({
    //   query: ({ body }: any) => ({
    //     url: SUPER_ADMIN_SETTINGS.JOB_APPLICATIONS,
    //     method: 'POST',
    //     body: body,
    //   }),
    //   invalidatesTags: TAG,
    // }),

    updateJobApp: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${SUPER_ADMIN_SETTINGS.JOB_APPLICATIONS}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    // deleteJob: builder.mutation({
    //   query: (id: any) => ({
    //     url: `${SUPER_ADMIN_SETTINGS.JOB_APPLICATIONS}/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: TAG,
    // }),
  }),
});

export const {
  useGetJobAppsQuery,
  useGetUniqueCandidateQuery,
  useUpdateJobAppMutation,
} = settingsJobAppsAPI;
