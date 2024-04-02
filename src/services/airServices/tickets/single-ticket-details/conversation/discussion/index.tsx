import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKET_CONVERSATION_DISCUSSION';

export const ticketConversationDiscussionAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getDiscussionsOfTicketConversation: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_DISCUSSION_OF_TICKET_CONVERSATION,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    postDiscussionsOfTicketConversation: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.ADD_DISCUSSION_OF_TICKET_CONVERSATION,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    updateDiscussionsOfTicketConversation: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.UPDATE_DISCUSSION_OF_TICKET_CONVERSATION,
        method: 'PATCH',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteDiscussionsOfTicketConversation: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.DELETE_DISCUSSION_OF_TICKET_CONVERSATION,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetDiscussionsOfTicketConversationQuery,
  usePostDiscussionsOfTicketConversationMutation,
  useUpdateDiscussionsOfTicketConversationMutation,
  useDeleteDiscussionsOfTicketConversationMutation,
} = ticketConversationDiscussionAPI;
