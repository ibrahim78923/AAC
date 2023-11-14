import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

const TAG = ['CREATE_TICKET'];

export const createTicketApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postCreateTicket: builder.mutation({
      query: () => ({
        url: `${END_POINTS?.CREATE_TICKET}`,
        method: 'post',
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const { usePostCreateTicketMutation } = createTicketApi;
