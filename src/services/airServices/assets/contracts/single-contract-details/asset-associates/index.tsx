import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'ASSETS_CONTRACT';

export const assetAssociateApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getSingleContractList: builder?.query({
      query: (contractId: any) => ({
        url: `${END_POINTS?.GET_SINGLE_ASSETS_CONTRACT}/${contractId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useLazyGetSingleContractListQuery } = assetAssociateApi;
