import { endpoints } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'RelatedTicket';

export const relatedTicketAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    relatedTicketList: builder.query({
      query: (relatedTicketList: any) => {
        return {
          url: `${endpoints?.RelatedTicketList}`,
          method: 'GET',
          params: relatedTicketList?.queryParams,
        };
      },
      providesTags: [TAG],
    }),
    postRelatedTicketList: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${endpoints?.AddRelatedTicketList}${id}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const { useRelatedTicketListQuery, usePostRelatedTicketListMutation } =
  relatedTicketAPI;
