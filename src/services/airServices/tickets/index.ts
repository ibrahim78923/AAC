import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKETS';

export const ticketsAPI: any = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getTicketsById: builder?.query({
      query: (getSingleTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET}/${getSingleTicketParameter?.pathParam?.ticketId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getExportTickets: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: { text: () => any }) => response?.text(),
      }),
      providesTags: [TAG],
    }),
    postTickets: builder?.mutation({
      query: (postTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'POST',
        body: postTicketParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    putTickets: builder?.mutation({
      query: (putTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET}/${putTicketParameter?.pathParam?.id}`,
        method: 'PUT',
        body: putTicketParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    putSingleTicketStatus: builder?.mutation({
      query: (putSingleTicketStatusParameter: any) => ({
        url: `${END_POINTS?.TICKET_STATUS}/${putSingleTicketStatusParameter?.pathParams?.ticketId}`,
        method: 'PUT',
        params: putSingleTicketStatusParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
    patchBulkUpdateTickets: builder?.mutation({
      query: (patchBulkUpdateTicketsParameter: any) => ({
        url: `${END_POINTS?.TICKET_BULK_UPDATE}`,
        method: 'PATCH',
        params: patchBulkUpdateTicketsParameter?.queryParams,
        body: patchBulkUpdateTicketsParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteTickets: builder?.mutation({
      query: (deleteTicketsParameter: any) => ({
        url: `${END_POINTS?.TICKET}`,
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
  usePatchBulkUpdateTicketsMutation,
} = ticketsAPI;
