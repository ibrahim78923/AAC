import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const airLoyaltyProgramDashboardApi = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getLoyaltyDashboardGiftCards: builder?.query({
      query: (params) => ({
        url: END_POINTS?.GIFT_CARD_LIST,
        method: 'GET',
        params,
      }),
    }),
    getLoyaltyDashboardRewards: builder?.query({
      query: (params) => ({
        url: END_POINTS?.GET_REWARDS_LIST,
        method: 'GET',
        params,
      }),
    }),
    getLoyaltyDashboardPointTransactions: builder?.query({
      query: (params: any) => ({
        url: END_POINTS?.GET_POINTS_TRANSACTION,
        method: 'GET',
        params,
      }),
    }),
    getLoyaltyDashboardTopConsumer: builder?.query({
      query: (params: any) => ({
        url: END_POINTS?.AIR_LOYALTY_PROGRAM_CONSUMERS_LIST,
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const {
  useGetLoyaltyDashboardGiftCardsQuery,
  useGetLoyaltyDashboardRewardsQuery,
  useGetLoyaltyDashboardPointTransactionsQuery,
  useGetLoyaltyDashboardTopConsumerQuery,
} = airLoyaltyProgramDashboardApi;
