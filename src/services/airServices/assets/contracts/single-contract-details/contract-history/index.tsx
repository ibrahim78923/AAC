import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'CONTRACT_HISTORY';

export const contractHistoryAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getContractHistory: builder?.query({
      query: (getContractHistoryParameter: any) => ({
        url: `${END_POINTS?.GET_ASSETS_CONTRACT}`,
        method: 'GET',
        params: getContractHistoryParameter?.queryParam,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useGetContractHistoryQuery } = contractHistoryAPI;
