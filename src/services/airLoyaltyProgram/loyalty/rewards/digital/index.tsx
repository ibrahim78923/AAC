import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const loyaltyDigitalRewardApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getAllLoyaltyDigitalRewardsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_REWARDS_LIST,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getAllLoyaltyDigitalRewardsDetailsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
  }),
});

export const {
  useLazyGetAllLoyaltyDigitalRewardsDetailsListQuery,
  useLazyGetAllLoyaltyDigitalRewardsListQuery,
} = loyaltyDigitalRewardApi;
