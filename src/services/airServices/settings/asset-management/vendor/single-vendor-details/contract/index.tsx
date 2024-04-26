import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'VENDOR_CONTRACT';

export const vendorsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getContractVendorList: builder?.query({
      query: ({ param }) => ({
        url: `${END_POINTS?.GET_CONTRACT_VENDOR_LIST}`,
        method: 'GET',
        params: param,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useGetContractVendorListQuery } = vendorsAPI;
