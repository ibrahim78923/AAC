import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKETS_APPROVALS';
const { ADD_CHILD_TICKET, GET_CHILD_TICKETS } = END_POINTS;
export const relatedTicketsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getApprovalsTickets: builder?.query({
      query: (getApprovalsTicketsParameters: any) => ({
        url: `${GET_CHILD_TICKETS}/${getApprovalsTicketsParameters?.pathParam?.id}`,
        method: 'GET',
        params: getApprovalsTicketsParameters?.queryParams,
      }),
      providesTags: [TAG],
    }),
    patchApprovalTickets: builder?.mutation({
      query: (patchApprovalTicketsParameters: any) => ({
        url: ADD_CHILD_TICKET,
        method: 'POST',
        params: patchApprovalTicketsParameters?.queryParams,
        body: patchApprovalTicketsParameters?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useLazyGetApprovalsTicketsQuery,
  usePatchApprovalTicketsMutation,
} = relatedTicketsAPI;
