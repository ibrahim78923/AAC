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
    getSingleDepartmentDetailsForAgent: builder?.query({
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
    getAgentDetailLevel: builder?.query({
      query: (getAgentDetailLevelParameter: any) => ({
        url: END_POINTS?.GET_TOP_PERFORMER,
        method: 'GET',
        params: getAgentDetailLevelParameter?.queryParams,
      }),
      transformResponse: (response: any, _: any, apiDataParameter: any) => {
        if (response)
          return response?.data?.find(
            (performer: any) =>
              performer?._id === apiDataParameter?.queryParams?.agent,
          );
      },
    }),
  }),
});

export const {
  useGetAgentAssetDetailsQuery,
  useGetAgentSoftwareDetailsQuery,
  useGetAgentTaskDetailsQuery,
  useGetAgentTicketDetailsQuery,
  useGetSingleAgentDetailsQuery,
  useGetSingleDepartmentDetailsForAgentQuery,
  useGetPermissionsRoleByIdForAgentQuery,
  useGetAgentDetailLevelQuery,
} = agentDetailsAPI;
