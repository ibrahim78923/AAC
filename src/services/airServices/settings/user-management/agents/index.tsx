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
export const agentsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAgents: builder.query({
      query: (params: any) => ({
        url: `${GET_AGENT}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    getAgentRequester: builder.query({
      query: (id: any) => ({
        url: `${GET_AGENT_REQUESTER}/${id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    postAddAgent: builder.mutation({
      query: (body: any) => ({
        url: `${ADD_AGENT}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    patchAgent: builder.mutation({
      query: ({ body }) => ({
        url: `${EDIT_AGENT}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    patchRejectRequest: builder.mutation({
      query: (params: any) => ({
        url: `${AGENT_REJECT_REQUEST}/{id}`,
        method: 'PATCH',
        params,
      }),
      invalidatesTags: [TAG],
    }),
    patchApprovedRequest: builder.mutation({
      query: (approvedRequestParameter: any) => ({
        url: `${APPROVED_REQUEST}/{id}`,
        method: 'PATCH',
        params: approvedRequestParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
    deleteAgent: builder?.mutation({
      query: (body: any) => ({
        url: `${DELETE_AGENT}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    getDepartmentDropdownList: builder?.query({
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
  }),
});

export const {
  useGetAgentsQuery,
  usePostAddAgentMutation,
  useDeleteAgentMutation,
  usePatchAgentMutation,
  useGetAgentRequesterQuery,
  useLazyGetAgentRequesterQuery,
  useLazyGetDepartmentDropdownListQuery,
  usePatchApprovedRequestMutation,
  usePatchRejectRequestMutation,
} = agentsAPI;
