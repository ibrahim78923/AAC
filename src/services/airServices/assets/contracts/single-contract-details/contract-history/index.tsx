import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'CONTRACT_HISTORY';

export const contractHistoryAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getSingleContractById: builder?.query({
      query: (getSingleContractParameter: any) => ({
        url: `${END_POINTS?.GET_SINGLE_ASSETS_CONTRACT}/${getSingleContractParameter?.pathParam?.contractId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useGetSingleContractByIdQuery } = contractHistoryAPI;
