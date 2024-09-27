import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKETS_APPROVALS';

export const approvalsTicketsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getSingleServicesTicketsApprovalsLists: builder?.query({
      query: (getApprovalsTicketsParameters: any) => ({
        url: END_POINTS?.GET_APPROVAL_TICKETS,
        method: 'GET',
        params: getApprovalsTicketsParameters?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getSingleServicesTicketsAllTypeApprovalsList: builder?.query({
      query: (getApprovalsTicketsParameters: any) => ({
        url: END_POINTS?.GET_APPROVAL_TICKETS,
        method: 'GET',
        params: getApprovalsTicketsParameters?.queryParams,
      }),
      providesTags: [TAG],
    }),
    addSingleServicesTicketsApproval: builder?.mutation({
      query: (postApprovalTicketsParameters: any) => ({
        url: END_POINTS?.ADD_APPROVALS_TICKETS,
        method: 'POST',
        params: postApprovalTicketsParameters?.queryParams,
        body: postApprovalTicketsParameters?.body,
      }),
      invalidatesTags: [TAG],
    }),
    updateSingleServicesTicketsApproval: builder?.mutation({
      query: (patchApprovalTicketsParameters: any) => ({
        url: END_POINTS?.UPDATE_APPROVAL_TICKETS,
        method: 'PATCH',
        params: patchApprovalTicketsParameters?.queryParams,
        body: patchApprovalTicketsParameters?.body,
      }),
      invalidatesTags: [TAG],
    }),
    sendSingleServicesTicketsApprovalReminder: builder?.mutation({
      query: () => ({
        url: END_POINTS?.SEND_TICKET_APPROVAL_REMINDER,
        method: 'POST',
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useLazyAddSingleServicesTicketsApprovalQuery,
  useGetSingleServicesTicketsAllTypeApprovalsListQuery,
  useGetSingleServicesTicketsApprovalsListsQuery,
  useAddSingleServicesTicketsApprovalMutation,
  useUpdateSingleServicesTicketsApprovalMutation,
  useSendSingleServicesTicketsApprovalReminderQuery,
} = approvalsTicketsAPI;
