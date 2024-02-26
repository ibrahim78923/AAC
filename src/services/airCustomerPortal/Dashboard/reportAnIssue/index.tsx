import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKETS';
export const reportAnIssue = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    postTickets: builder?.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const { usePostTicketsMutation } = reportAnIssue;
