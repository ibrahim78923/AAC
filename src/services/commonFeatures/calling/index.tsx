import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const exampleExampleAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCalls: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.CALLS,
        method: 'GET',
        params: params,
      }),
      providesTags: ['CALLS'],
    }),
    postCalls: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.CALLS}`,
        method: 'POST',
        body: body,
        params: body,
      }),
      invalidatesTags: ['CALLS'],
    }),
    updateCalls: builder.mutation({
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
