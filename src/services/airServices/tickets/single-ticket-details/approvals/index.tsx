import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKETS_APPROVALS';
const TAG_FOUR = 'USERS_DROPDOWN';

export const relatedTicketsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getApprovalsTickets: builder?.query({
      query: (getApprovalsTicketsParameters: any) => ({
        url: END_POINTS?.GET_APPROVAL_TICKETS,
        method: 'GET',
        params: getApprovalsTicketsParameters?.queryParams,
      }),
      providesTags: [TAG],
    }),
    postApprovalTickets: builder?.mutation({
      query: (postApprovalTicketsParameters: any) => ({
        url: END_POINTS?.ADD_APPROVALS_TICKETS,
        method: 'POST',
        params: postApprovalTicketsParameters?.queryParams,
        body: postApprovalTicketsParameters?.body,
      }),
      invalidatesTags: [TAG],
    }),
    patchApprovalTickets: builder?.mutation({
      query: (patchApprovalTicketsParameters: any) => ({
        url: END_POINTS?.UPDATE_APPROVAL_TICKETS,
        method: 'PATCH',
        params: patchApprovalTicketsParameters?.queryParams,
        body: patchApprovalTicketsParameters?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getUsersDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_FOUR],
    }),
  }),
});

export const {
  useLazyGetApprovalsTicketsQuery,
  usePatchApprovalTicketsMutation,
  usePostApprovalTicketsMutation,
  useLazyGetUsersDropdownQuery,
  useGetApprovalsTicketsQuery,
} = relatedTicketsAPI;
