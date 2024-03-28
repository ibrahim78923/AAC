import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'AGENTS';

export const agentDetailsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getSingleAgentDetails: builder?.query({
      query: (getSingleAgentDetailsParameter: any) => ({
        url: `${END_POINTS?.REQUESTER_VIEW_DETAILS}${getSingleAgentDetailsParameter?.pathParams?.id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
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
        url: `${END_POINTS?.AGENTS_SOFTWARE_LIST}/${getAgentSoftwareDetailsParameter?.pathParams?.id}`,
        method: 'GET',
      }),
    }),
    getSingleDepartmentDetails: builder?.query({
      query: (getSingleDepartmentDetailsParameter: any) => ({
        url: `${END_POINTS?.SINGLE_DEPARTMENT_DETAIL}/${getSingleDepartmentDetailsParameter?.pathParams?.id}`,
        method: 'GET',
      }),
    }),
    getPermissionsRoleByIdForAgent: builder?.query({
      query: (getPermissionsRoleByIdForAgentParameter: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}/${getPermissionsRoleByIdForAgentParameter?.pathParams?.roleId}`,
        method: 'GET',
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
  useGetSingleDepartmentDetailsQuery,
  useGetPermissionsRoleByIdForAgentQuery,
} = agentDetailsAPI;
