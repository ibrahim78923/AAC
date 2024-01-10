import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'ASSETS_CONTRACT';
const TAG_TWO = 'CONTRACT_TYPE_DROPDOWN';
const TAG_THREE = 'VENDOR_DROPDOWN';

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
      invalidatesTags: [TAG],
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
    patchContract: builder?.mutation({
      query: (patchContractParameter: any) => ({
        url: `${END_POINTS?.EDIT_CONTRACT}/${patchContractParameter?.pathParam?.id}`,
        method: 'PATCH',
        body: patchContractParameter?.body,
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
  }),
});

export const {
  useLazyGetContractQuery,
  useLazyGetExportContractQuery,
  useDeleteContractMutation,
  useLazyGetContractTypeDropdownQuery,
  useLazyGetVendorDropdownQuery,
  usePostContractMutation,
  usePatchContractMutation,
  usePatchContractStatusMutation,
} = contractAPI;
