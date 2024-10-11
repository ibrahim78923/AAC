import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = 'LOYALTY_REWARDS';
const loyaltyRewardsApi = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getLoyaltyRewardsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_REWARDS_LIST,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getRewardsDetailsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const {
  useLazyGetLoyaltyRewardsListQuery,
  useLazyGetRewardsDetailsListQuery,
} = loyaltyRewardsApi;
