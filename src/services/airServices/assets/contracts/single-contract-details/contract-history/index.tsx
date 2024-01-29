import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'CONTRACT_HISTORY';

export const contractHistoryAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getContractHistory: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_ASSETS_CONTRACT}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useLazyGetContractHistoryQuery } = contractHistoryAPI;
