import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'RELATED_TICKETS';
const { ADD_CHILD_TICKET, GET_CHILD_TICKETS, DELETE_CHILD_TICKET } = END_POINTS;
export const relatedTicketsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getChildTickets: builder?.query({
      query: (getChildTicketsParameters: any) => ({
        url: `${GET_CHILD_TICKETS}/${getChildTicketsParameters?.pathParam?.id}`,
        method: 'GET',
        params: getChildTicketsParameters?.queryParams,
      }),
      providesTags: [TAG],
    }),
    addChildTickets: builder?.mutation({
      query: (addChildTicketParameters: any) => ({
        url: ADD_CHILD_TICKET,
        method: 'POST',
        params: addChildTicketParameters?.queryParams,
        body: addChildTicketParameters?.body,
      }),
      invalidatesTags: [TAG],
    }),
    putChildTickets: builder?.mutation({
      query: (putTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET}/${putTicketParameter?.pathParam?.id}`,
        method: 'PUT',
        body: putTicketParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteChildTickets: builder?.mutation({
      query: (deleteTicketsParameter: any) => ({
        url: `${DELETE_CHILD_TICKET}`,
        method: 'DELETE',
        params: deleteTicketsParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useLazyGetChildTicketsQuery,
  useGetChildTicketsQuery,
  useAddChildTicketsMutation,
  useDeleteChildTicketsMutation,
  usePutChildTicketsMutation,
} = relatedTicketsAPI;
