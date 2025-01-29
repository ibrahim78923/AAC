import { COMMON_CONTRACTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAGS = ['COMMON_CONTRACTS'];
export const commonContractsDashboardAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCommonContractFolder: builder.query({
      query: (params) => ({
        url: COMMON_CONTRACTS?.TEMPLATE,
        method: 'GET',
        params,
      }),
      providesTags: TAGS,
    }),

    getCommonContractsList: builder.query({
      query: (params) => ({
        url: COMMON_CONTRACTS?.GET_COMMON_CONTRACTS,
        method: 'GET',
        params,
      }),
      providesTags: TAGS,
    }),

    getCommonContractsSharedFoldersList: builder.query({
      query: (params) => ({
        url: COMMON_CONTRACTS?.GET_COMMON_CONTRACTS_FOLDERS,
        method: 'GET',
        params,
      }),
      providesTags: TAGS,
    }),
    getCommonContractsPersonalFoldersList: builder.query({
      query: (params) => ({
        url: COMMON_CONTRACTS?.GET_COMMON_CONTRACTS_FOLDERS,
        method: 'GET',
        params,
      }),
      providesTags: TAGS,
    }),

    postCreateContractFolder: builder.mutation({
      query: ({ payload }: any) => ({
        url: COMMON_CONTRACTS?.POST_COMMON_CONTRACTS_FOLDERS,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: TAGS,
    }),
  }),
});
export const {
  useGetCommonContractFolderQuery,
  useGetCommonContractsListQuery,
  useGetCommonContractsSharedFoldersListQuery,
  useGetCommonContractsPersonalFoldersListQuery,
  usePostCreateContractFolderMutation,
} = commonContractsDashboardAPI;
