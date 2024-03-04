import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = 'REQUEST_APPROVAL';
export const approvalsAPI = baseAPI.injectEndpoints({
  endpoints: (builder: any) => ({
    postRequestApproval: builder?.mutation({
      query: (params: any) => ({
        url: `${END_POINTS?.REQUEST_APPROVAL}`,
        method: 'POST',
        params,
      }),
      invalidatesTags: [TAG],
    }),
    patchRequestApproval: builder?.mutation({
      query: (params: any) => ({
        url: `${END_POINTS?.PATCH_APPROVAL_STATUS}`,
        method: 'PATCH',
        params,
      }),
      invalidatesTags: [TAG],
    }),
    getApprovalRequests: builder?.query({
      query: (params: any) => ({
        url: `${END_POINTS?.REQUEST_APPROVALS_LIST}/${params?.purchaseOrderId}`,
        method: 'GET',
        params: params?.params,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const {
  usePostRequestApprovalMutation,
  usePatchRequestApprovalMutation,
  useLazyGetApprovalRequestsQuery,
} = approvalsAPI;
