import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const exampleExampleAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCalls: builder?.query({
      query: ({ page, pageLimit, query }: any) => ({
        url: `${END_POINTS?.CALLS}?page=${page}&limit=${pageLimit}${query}`,
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
      query: ({ body, id }: any) => ({
        url: `${END_POINTS?.CALLS}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['CALLS'],
    }),
    deleteCalls: builder.mutation({
      query: ({ id }: any) => ({
        url: `${END_POINTS?.CALLS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CALLS'],
    }),
    getCallsWidget: builder?.query({
      query: ({ query }: any) => ({
        url: `${END_POINTS?.CALL_WIDGET}?${query}`,
        method: 'GET',
      }),
      providesTags: ['CALLS'],
    }),
  }),
});

export const {
  useGetCallsQuery,
  useGetCallsWidgetQuery,
  usePostCallsMutation,
  useUpdateCallsMutation,
  useDeleteCallsMutation,
} = exampleExampleAPI;
