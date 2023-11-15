import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

const TAG = ['NEW_INCIDENT'];

export const newIncidentApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postNewIncident: builder.mutation({
      query: (postInventoryParameter: any) => ({
        url: `${END_POINTS?.NEW_INCIDENT}`,
        method: 'post',
        body: postInventoryParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const { usePostNewIncidentMutation } = newIncidentApi;
