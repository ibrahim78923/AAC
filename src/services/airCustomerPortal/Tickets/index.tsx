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
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.TICKET_STATUS}`,
        method: 'PUT',
        params: apiDataParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
    postReplyToConversationEmail: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.TICKET_NEW_EMAIL}`,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
    getSingleTicketConversations: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.TICKET_NEW_EMAIL}`,
        method: 'GET',
        body: apiDataParameter?.body,
      }),
    }),
  }),
});

export const {
  useLazyGetCustomerPortalTicketsQuery,
  useLazyGetCustomerPortalTicketsByIdQuery,
  useEditTicketStatusMutation,
  useGetCustomerPortalTicketsByIdQuery,
  useGetSingleTicketConversationsQuery,
  usePostReplyToConversationEmailMutation,
} = ticketsAPI;
