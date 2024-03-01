import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKETS';

export const ticketsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerPortalTickets: builder?.query({
      query: (params) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    getCustomerPortalTicketsById: builder?.query({
      query: (ticketId: any) => ({
        url: `${END_POINTS?.TICKET}/${ticketId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    editTicketStatus: builder?.mutation({
      query: ({ id, params }: any) => ({
        url: `${END_POINTS?.TICKET_STATUS}/${id}`,
        method: 'PUT',
        params,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useLazyGetCustomerPortalTicketsQuery,
  useLazyGetCustomerPortalTicketsByIdQuery,
  useEditTicketStatusMutation,
} = ticketsAPI;
