import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'ASSETS_CONTRACT_LIST';

export const contractAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    deleteContract: builder?.mutation({
      query: (deleteContractParameter: any) => ({
        url: `${END_POINTS?.ASSETS_CONTRACT_DELETE}`,
        method: 'DELETE',
        params: deleteContractParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const { useDeleteContractMutation } = contractAPI;
