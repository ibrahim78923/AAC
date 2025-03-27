import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'REQUEST_APPROVAL';

export const approvalsAPI = baseAPI.injectEndpoints({
  endpoints: (builder: any) => ({
    postAirServicesAssetsPurchaseOrderApprovalRequestApproval:
      builder?.mutation({
        query: (params: any) => ({
          url: END_POINTS?.REQUEST_APPROVAL,
          method: 'POST',
          params,
        }),
        invalidatesTags: [TAG],
      }),

    patchAirServicesAssetsPurchaseOrderApprovalRequestApproval:
      builder?.mutation({
        query: (params: any) => ({
          url: END_POINTS?.PATCH_APPROVAL_STATUS,
          method: 'PATCH',
          params,
        }),
        invalidatesTags: [TAG],
      }),

    getAirServicesAssetsPurchaseOrderApprovalApprovalRequests: builder?.query({
      query: (params: any) => ({
        url: `${END_POINTS?.REQUEST_APPROVALS_LIST}/${params?.purchaseOrderId}`,
        method: 'GET',
        params: params?.params,
      }),
      providesTags: [TAG],
    }),

    postAirServicesAssetsPurchaseOrderApprovalReminders: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.SEND_PURCHASE_APPROVAL_REMINDER,
        method: 'POST',
        params: apiDataParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),

    getAirServicesAssetsPurchaseOrderApprovalAgents: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.DROPDOWN_USERS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG],
    }),
  }),
});

export const {
  usePostAirServicesAssetsPurchaseOrderApprovalRequestApprovalMutation,
  usePatchAirServicesAssetsPurchaseOrderApprovalRequestApprovalMutation,
  useLazyGetAirServicesAssetsPurchaseOrderApprovalApprovalRequestsQuery,
  usePostAirServicesAssetsPurchaseOrderApprovalRemindersMutation,
  useLazyGetAirServicesAssetsPurchaseOrderApprovalAgentsQuery,
} = approvalsAPI;
