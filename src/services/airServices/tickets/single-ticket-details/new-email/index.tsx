import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const servicesTicketEmailApi = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    sendServicesSingleTicketEmail: builder?.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.TICKET_NEW_EMAIL}`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSendServicesSingleTicketEmailMutation } =
  servicesTicketEmailApi;
