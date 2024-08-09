import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKETS';
const TAG_TWO = 'CUSTOMER_TICKET_CONVERSATION';

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
    getSingleDefaultSurveyForCustomerTickets: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_SINGLE_DEFAULT_CUSTOMER_SURVEY}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    checkSingleDefaultSurveySubmittedForRequester: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.CHECK_SINGLE_DEFAULT_CUSTOMER_SURVEY_SUBMITTED}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    postReplyForCustomerTicketConversation: builder?.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.CONVERSATION_EMAIL}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [TAG_TWO],
    }),
    getConversationForCustomerSingleTicket: builder?.query({
      query: (params: any) => ({
        url: `${END_POINTS?.GET_CONVERSATION_EMAIL}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG_TWO],
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
  useLazyGetSingleDefaultSurveyForCustomerTicketsQuery,
  useGetSingleDefaultSurveyForCustomerTicketsQuery,
  useLazyCheckSingleDefaultSurveySubmittedForRequesterQuery,
  useLazyGetConversationForCustomerSingleTicketQuery,
  usePostReplyForCustomerTicketConversationMutation,
  useGetConversationForCustomerSingleTicketQuery,
} = ticketsAPI;
