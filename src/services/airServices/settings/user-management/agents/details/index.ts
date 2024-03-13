import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const agentDetailsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getSingleAgentDetails: builder?.query({
      query: (getSingleAgentDetailsParameter: any) => ({
        url: `${END_POINTS?.REQUESTER_VIEW_DETAILS}${getSingleAgentDetailsParameter?.pathParams?.id}`,
        method: 'GET',
      }),
    }),
    getAgentTicketDetails: builder?.query({
      query: (getAgentTicketDetailsParameter: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'GET',
        params: getAgentTicketDetailsParameter?.queryParams,
      }),
    }),
    getAgentTaskDetails: builder?.query({
      query: (getAgentTaskDetailsParameter: any) => ({
        url: `${END_POINTS?.WORKLOAD}`,
        method: 'GET',
        params: getAgentTaskDetailsParameter?.queryParams,
      }),
    }),
    getAgentAssetDetails: builder?.query({
      query: (getAgentAssetDetailsParameter: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY}`,
        method: 'GET',
        params: getAgentAssetDetailsParameter?.queryParams,
      }),
    }),
    getAgentSoftwareDetails: builder?.query({
      query: (getAgentSoftwareDetailsParameter: any) => ({
        url: `${END_POINTS?.REQUESTER_VIEW_DETAILS}`,
        method: 'GET',
        params: getAgentSoftwareDetailsParameter?.queryParams,
      }),
    }),
  }),
});

export const {
  useGetAgentAssetDetailsQuery,
  useGetAgentSoftwareDetailsQuery,
  useGetAgentTaskDetailsQuery,
  useGetAgentTicketDetailsQuery,
  useGetSingleAgentDetailsQuery,
} = agentDetailsAPI;
