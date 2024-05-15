import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const loyaltyPhysicalRewardApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getAllLoyaltyPhysicalRewardsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_REWARDS_LIST,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getAllLoyaltyPhysicalRewardsDetailsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
  }),
});

export const {
  useLazyGetAllLoyaltyPhysicalRewardsDetailsListQuery,
  useLazyGetAllLoyaltyPhysicalRewardsListQuery,
} = loyaltyPhysicalRewardApi;
