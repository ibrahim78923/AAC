import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKET_DETAILS';
const TAG_THREE = 'DROPDOWN_AGENT';

const ticketsDetailsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getTicketsDetailsById: builder?.query({
      query: (getSingleTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET_DETAILS}/${getSingleTicketParameter?.pathParam?.ticketId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getAgentDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_AGENTS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.users;
      },
      providesTags: [TAG_THREE],
    }),
    putTickets: builder?.mutation({
      query: (putTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET}/${putTicketParameter?.pathParam?.id}`,
        method: 'PUT',
        body: putTicketParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetTicketsDetailsByIdQuery,
  useLazyGetTicketsDetailsByIdQuery,
  useLazyGetAgentDropdownQuery,
  usePutTicketsMutation,
} = ticketsDetailsAPI;
