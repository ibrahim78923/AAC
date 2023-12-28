import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const exampleExampleAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCalls: builder?.query({
      query: ({ page, pageLimit }: any) => ({
        url: `${END_POINTS?.CALLS}?page=${page}&limit=${pageLimit}`,
        method: 'GET',
      }),
      providesTags: ['CALLS'],
    }),
    postCalls: builder?.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.CALLS}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['CALLS'],
    }),
    updateCalls: builder?.mutation({
      query: ({ body, contactId }: any) => ({
        url: `${END_POINTS?.CALLS}/${contactId}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['CALLS'],
    }),
  }),
});

export const {
  useGetCallsQuery,
  usePostCallsMutation,
  useUpdateCallsMutation,
} = exampleExampleAPI;
