import { baseAPI } from '@/services/base-api';
const TAG = 'TICKETS';
export const ticketsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `/ticket`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getTicketsById: builder?.query({
      query: ({ id }: any) => ({
        url: `/ticket/${id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    postTickets: builder?.mutation({
      query: ({ body }: any) => ({
        url: `/ticket`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [TAG],
    }),
    putTickets: builder?.mutation({
      query: ({ id, body }: any) => ({
        url: `/ticket/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteTickets: builder?.mutation({
      query: ({ id }: any) => ({
        url: `/ticket/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  usePostTicketsMutation,
  useGetTicketsQuery,
  useDeleteTicketsMutation,
  useGetTicketsByIdQuery,
  usePutTicketsMutation,
  useLazyGetTicketsQuery,
} = ticketsAPI;
