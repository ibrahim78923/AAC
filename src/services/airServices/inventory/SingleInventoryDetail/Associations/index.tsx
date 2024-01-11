import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKETS';
export const newIncident = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postIncident: builder?.mutation({
      query: (postIncidentParameter: any) => ({
        url: `${END_POINTS?.TICKET}/${postIncidentParameter?.pathParam?.id}`,
        method: 'PUT',
        body: postIncidentParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getExitingTickets: builder?.query({
      query: () => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'GET',
        // params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { usePostIncidentMutation, useGetExitingTicketsQuery } =
  newIncident;
