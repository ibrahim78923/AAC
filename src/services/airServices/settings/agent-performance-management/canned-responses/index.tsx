import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'CANNED_RESPONSES';

export const cannedResponsesAPI: any = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getCannedResponses: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_CANNED_RESPONSES}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),

    postCannedResponses: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.ADD_CANNED_RESPONSES}`,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetCannedResponsesQuery,
  useLazyGetCannedResponsesQuery,
  usePostCannedResponsesMutation,
} = cannedResponsesAPI;
