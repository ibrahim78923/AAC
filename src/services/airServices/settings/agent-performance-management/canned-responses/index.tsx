import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'CANNED_RESPONSES';
const TAG1 = 'RESPONSES_LIST';

export const cannedResponsesAPI = baseAPI?.injectEndpoints({
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
    getResponsesList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_RESPONSES_LIST}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG1],
    }),
    postResponse: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.POST_RESPONSE}`,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG1],
    }),
    patchResponse: builder?.mutation({
      query: (patchResponseParameter: any) => ({
        url: `${END_POINTS?.UPDATE_RESPONSE}`,
        method: 'PATCH',
        body: patchResponseParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetCannedResponsesQuery,
  useLazyGetCannedResponsesQuery,
  useLazyGetResponsesListQuery,
  usePostCannedResponsesMutation,
  usePostResponseMutation,
  usePatchResponseMutation,
} = cannedResponsesAPI;
