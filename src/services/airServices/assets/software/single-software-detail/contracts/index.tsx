import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'SOFTWARE_CONTRACTS';
export const softwareContractsApi = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getSoftwareContracts: builder?.query({
      query: (params) => ({
        url: END_POINTS?.SOFTWARE_CONTRACTS,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    getSingleSoftwareById: builder?.query({
      query: (singleSoftwareParameters: any) => ({
        url: `${END_POINTS?.GET_SOFTWARE_DETAIL}`,
        method: 'GET',
        params: singleSoftwareParameters?.queryParams,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const {
  useLazyGetSoftwareContractsQuery,
  useGetSingleSoftwareByIdQuery,
} = softwareContractsApi;
