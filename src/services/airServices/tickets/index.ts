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
    getExportTickets: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `/ticket`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
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
      query: (deleteTicketsParameter: any) => ({
        url: `/ticket`,
        method: 'DELETE',
        params: deleteTicketsParameter?.queryParams,
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
  useLazyGetExportTicketsQuery,
} = ticketsAPI;
