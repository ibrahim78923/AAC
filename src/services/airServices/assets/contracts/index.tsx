import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'ASSETS_CONTRACT';
const TAG_TWO = 'CONTRACT_TYPE_DROPDOWN';
const TAG_THREE = 'VENDOR_DROPDOWN';
const TAG_FOUR = 'USERS_DROPDOWN';
const TAG_FIVE = 'SOFTWARE_DROPDOWN';
const TAG_SIX = 'CONTRACT_TYPE';

export const contractAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getContract: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_ASSETS_CONTRACT}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getSingleContractById: builder?.query({
      query: (getSingleContractParameter: any) => ({
        url: `${END_POINTS?.GET_SINGLE_ASSETS_CONTRACT}/${getSingleContractParameter?.pathParam?.contractId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getExportContract: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_ASSETS_CONTRACT}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
      providesTags: [TAG],
    }),
    deleteContract: builder?.mutation({
      query: (deleteContractParameter: any) => ({
        url: `${END_POINTS?.ASSETS_CONTRACT}`,
        method: 'DELETE',
        params: deleteContractParameter?.queryParams,
      }),
    }),
    getContractTypeDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.CONTRACT_TYPE_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.contracttypes;
      },
      providesTags: [TAG_TWO],
    }),
    getVendorDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.VENDOR_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_THREE],
    }),
    postContract: builder?.mutation({
      query: (postContractParameter: any) => ({
        url: `${END_POINTS?.ADD_CONTRACT}`,
        method: 'POST',
        body: postContractParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    putContract: builder?.mutation({
      query: (putContractParameter: any) => ({
        url: `${END_POINTS?.EDIT_CONTRACT}/${putContractParameter?.pathParam?.contractId}`,
        method: 'PUT',
        body: putContractParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    patchContractStatus: builder?.mutation({
      query: (patchContractStatusParameter: any) => ({
        url: `${END_POINTS?.UPDATE_CONTRACT_STATUS}/${patchContractStatusParameter?.pathParam?.id}`,
        method: 'PATCH',
        body: patchContractStatusParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getDropdownAssets: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.ASSETS_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.inventories;
      },
      providesTags: [TAG_THREE],
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
    getAgentsDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_ALL_AGENTS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_FOUR],
    }),
    getSoftwareDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_SOFTWARE}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.assetssoftwares;
      },
      providesTags: [TAG_FIVE],
    }),
    patchContractSubmitForApproval: builder?.mutation({
      query: ({ contractId, statusApproval }: any) => ({
        url: `${END_POINTS?.UPDATE_CONTRACT_SUBMIT_APPROVAL}/${contractId}/${statusApproval}`,
        method: 'PATCH',
      }),
      invalidatesTags: [TAG],
    }),
    patchContractApprove: builder?.mutation({
      query: (patchContractApproveParameter: any) => ({
        url: `${END_POINTS?.UPDATE_CONTRACT_APPROVE}/${patchContractApproveParameter?.pathParam?.contractId}`,
        method: 'PATCH',
        body: patchContractApproveParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    patchContractReject: builder?.mutation({
      query: (patchContractRejectParameter: any) => ({
        url: `${END_POINTS?.UPDATE_CONTRACT_REJECT}/${patchContractRejectParameter?.pathParam?.contractId}`,
        method: 'PATCH',
        body: patchContractRejectParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    patchContractTerminated: builder?.mutation({
      query: ({ contractId, statusApproval }: any) => ({
        url: `${END_POINTS?.UPDATE_CONTRACT_SUBMIT_APPROVAL}/${contractId}/${statusApproval}`,
        method: 'PATCH',
      }),
      invalidatesTags: [TAG],
    }),
    patchContractRenewExtend: builder?.mutation({
      query: (patchContractRenewExtendParameter: any) => ({
        url: `${END_POINTS?.UPDATE_CONTRACT}/${patchContractRenewExtendParameter?.pathParam?.contractId}`,
        method: 'PATCH',
        body: patchContractRenewExtendParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getUsersDropdownListForContractApprovals: builder?.query({
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
    getAssetsDropdownListForContractApprovals: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.ASSETS_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.inventories;
      },
      providesTags: [TAG_THREE],
    }),
    getVendorDropdownListForContractApprovals: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.VENDOR_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_THREE],
    }),
    getSoftwareDropdownListForContractApprovals: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_SOFTWARE}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.assetssoftwares;
      },
      providesTags: [TAG_FIVE],
    }),
    getContractTypeList: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.CONTRACT_TYPE_SERVICES_SETTINGS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_SIX],
    }),
  }),
});

export const {
  useLazyGetContractQuery,
  useLazyGetExportContractQuery,
  useDeleteContractMutation,
  useLazyGetContractTypeDropdownQuery,
  useLazyGetVendorDropdownQuery,
  usePostContractMutation,
  usePutContractMutation,
  usePatchContractStatusMutation,
  useLazyGetDropdownAssetsQuery,
  useLazyGetUsersDropdownQuery,
  useLazyGetSoftwareDropdownQuery,
  useLazyGetAgentsDropdownQuery,
  useGetSingleContractByIdQuery,
  usePatchContractSubmitForApprovalMutation,
  usePatchContractApproveMutation,
  usePatchContractRejectMutation,
  usePatchContractTerminatedMutation,
  usePatchContractRenewExtendMutation,
  useLazyGetUsersDropdownListForContractApprovalsQuery,
  useLazyGetAssetsDropdownListForContractApprovalsQuery,
  useLazyGetVendorDropdownListForContractApprovalsQuery,
  useLazyGetSoftwareDropdownListForContractApprovalsQuery,
  useLazyGetContractTypeListQuery,
} = contractAPI;
