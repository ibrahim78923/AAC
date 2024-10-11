import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG_ONE = 'DROPDOWN_DEPARTMENT';
const TAG = 'AGENTS';
const {
  GET_AGENT,
  ADD_AGENT,
  DELETE_AGENT,
  EDIT_AGENT,
  GET_AGENT_REQUESTER,
  AGENT_REJECT_REQUEST,
  APPROVED_REQUEST,
} = END_POINTS;

export const agentsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getServicesUserAgents: builder?.query({
      query: (getAgentsListParameter: any) => ({
        url: `${GET_AGENT}`,
        method: 'GET',
        params: getAgentsListParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getAgentRequester: builder?.query({
      query: () => ({
        url: `${GET_AGENT_REQUESTER}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    postAddAgent: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${ADD_AGENT}`,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    patchAgent: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${EDIT_AGENT}`,
        method: 'PATCH',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    patchRejectRequest: builder?.mutation({
      query: (params: any) => ({
        url: `${AGENT_REJECT_REQUEST}/{id}`,
        method: 'PATCH',
        params,
      }),
      invalidatesTags: [TAG],
    }),
    patchApprovedRequest: builder?.mutation({
      query: (approvedRequestParameter: any) => ({
        url: `${APPROVED_REQUEST}/{id}`,
        method: 'PATCH',
        params: approvedRequestParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
    deleteAgent: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${DELETE_AGENT}`,
        method: 'DELETE',
        body: apiDataParameter?.body,
      }),
    }),
    getDepartmentDropdownListForAgents: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_DEPARTMENT}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.departments;
      },
      providesTags: [TAG_ONE],
    }),
    getPermissionsRoleForUpsertAgent: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.companyaccountroles;
      },
      providesTags: [TAG],
    }),
  }),
});

export const {
  useGetServicesUserAgentsQuery,
  usePostAddAgentMutation,
  useDeleteAgentMutation,
  usePatchAgentMutation,
  useGetAgentRequesterQuery,
  useLazyGetAgentRequesterQuery,
  useLazyGetDepartmentDropdownListForAgentsQuery,
  usePatchApprovedRequestMutation,
  usePatchRejectRequestMutation,
  useLazyGetServicesUserAgentsQuery,
  useLazyGetPermissionsRoleForUpsertAgentQuery,
} = agentsAPI;
