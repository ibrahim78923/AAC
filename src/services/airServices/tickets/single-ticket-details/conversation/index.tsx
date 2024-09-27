import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG_TWO = 'TICKETS_CONVERSATION';

const {
  GET_RESPONSES_LIST,
  GET_ALL_ARTICLES,
  GET_CONVERSATION_EMAIL,
  CONVERSATION_EMAIL,
  EDIT_TICKET_CONVERSATION_NOTE,
  DELETE_TICKET_CONVERSATION,
} = END_POINTS ?? {};

export const conversationAPI: any = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getServicesTicketsConversationCannedResponsesLists: builder?.query({
      query: (apiDataParameter: any) => ({
        url: GET_RESPONSES_LIST,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getServicesTicketsConversationPublishedArticlesList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: GET_ALL_ARTICLES,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getServicesTicketsConversationList: builder?.query({
      query: (params: any) => ({
        url: GET_CONVERSATION_EMAIL,
        method: 'GET',
        params,
      }),
      providesTags: [TAG_TWO],
    }),
    addServicesTicketsSingleConversation: builder?.mutation({
      query: ({ body }: any) => ({
        url: CONVERSATION_EMAIL,
        method: 'POST',
        body: body,
      }),
    }),
    updateServicesTicketSingleConversationNote: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: EDIT_TICKET_CONVERSATION_NOTE,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
    deleteServicesTicketSingleConversation: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: DELETE_TICKET_CONVERSATION,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
    }),
  }),
});

export const {
  useGetServicesTicketsConversationCannedResponsesListsQuery,
  useGetServicesTicketsConversationPublishedArticlesListQuery,
  useGetServicesTicketsConversationListQuery,
  useAddServicesTicketsSingleConversationMutation,
  useUpdateServicesTicketSingleConversationNoteMutation,
  useDeleteServicesTicketSingleConversationMutation,
} = conversationAPI;
