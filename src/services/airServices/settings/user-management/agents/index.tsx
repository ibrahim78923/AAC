import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'AGENTS';
const {
  GET_AGENT,
  ADD_AGENT,
  DELETE_AGENT,
  EDIT_AGENT,
  GET_AGENT_REQUESTER,
  AGENT_REJECT_REQUEST,
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
      query: (params: any) => ({
        url: `${GET_AGENT_REQUESTER}/${params?.id}`,
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
      query: ({ id, body }) => ({
        url: `${EDIT_AGENT}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    patchRejectRequest: builder.mutation({
      query: ({ id, body }) => ({
        url: `${AGENT_REJECT_REQUEST}/${id}`,
        method: 'PATCH',
        body,
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
  }),
});

export const {
  useGetAgentsQuery,
  usePostAddAgentMutation,
  useDeleteAgentMutation,
  usePatchAgentMutation,
  useGetAgentRequesterQuery,
  useLazyGetAgentRequesterQuery,
} = agentsAPI;
