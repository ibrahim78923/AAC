import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['TICKET_ASSOCIATION'];
export const contactTicketAssociationsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postTicket: builder.mutation({
      query: (body: any) => {
        return {
          url: END_POINTS?.TICKET,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),
  }),
});

export const { usePostTicketMutation } = contactTicketAssociationsAPI;
