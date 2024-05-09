import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const loyaltyRewardsApi = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getLoyaltyAllRewardsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_REWARDS_LIST,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    addDigitalLoyaltyReward: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.CREATE_DIGITAL_REWARD,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
    addPhysicalLoyaltyReward: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.CREATE_PHYSICAL_REWARD,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
    getVoucherDropdownForRewards: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.GET_VOUCHERS_REWARDS_DROPDOWN,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data ?? [];
      },
    }),
    getTiersDropdownForRewards: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.TIERS_DROPDOWN_FOR_REWARDS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.tiers ?? [];
      },
    }),
    getCustomersDropdownForRewards: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.GET_VOUCHERS_REWARDS_DROPDOWN,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data ?? [];
      },
    }),
  }),
});

export const {
  useLazyGetLoyaltyAllRewardsListQuery,
  useLazyGetCustomersDropdownForRewardsQuery,
  useLazyGetTiersDropdownForRewardsQuery,
  useLazyGetVoucherDropdownForRewardsQuery,
  useAddDigitalLoyaltyRewardMutation,
  useAddPhysicalLoyaltyRewardMutation,
} = loyaltyRewardsApi;
