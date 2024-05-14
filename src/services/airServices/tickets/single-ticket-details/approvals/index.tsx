import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKETS_APPROVALS';
const TAG_FOUR = 'USERS_DROPDOWN';

export const approvalsTicketsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getApprovalsTickets: builder?.query({
      query: (getApprovalsTicketsParameters: any) => ({
        url: END_POINTS?.GET_APPROVAL_TICKETS,
        method: 'GET',
        params: getApprovalsTicketsParameters?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getAllApprovalsTickets: builder?.query({
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
    postApprovalTicketsReminders: builder?.mutation({
      query: () => ({
        url: END_POINTS?.SEND_TICKET_APPROVAL_REMINDER,
        method: 'POST',
      }),
      invalidatesTags: [TAG],
    }),
    getUsersDropdownListForTicketsApprovals: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.AGENTS_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.users;
      },
    }),
  }),
});

export const {
  useLazyGetApprovalsTicketsQuery,
  usePatchApprovalTicketsMutation,
  usePostApprovalTicketsMutation,
  useLazyGetUsersDropdownQuery,
  useGetApprovalsTicketsQuery,
  useGetAllApprovalsTicketsQuery,
  usePostApprovalTicketsRemindersMutation,
  useLazyGetUsersDropdownListForTicketsApprovalsQuery,
} = approvalsTicketsAPI;
