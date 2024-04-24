import { baseAPI } from '@/services/base-api';

const loyaltyRewardsApi = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getLoyaltyAllRewardsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    addLoyaltyReward: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
    getVoucherDropdownForRewards: builder?.query({
      query: ({ params }: any) => ({
        url: ``,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.vouchers ?? [];
      },
    }),
    getTiersDropdownForRewards: builder?.query({
      query: ({ params }: any) => ({
        url: ``,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.tiers ?? [];
      },
    }),
    getCustomersDropdownForRewards: builder?.query({
      query: ({ params }: any) => ({
        url: ``,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.customer ?? [];
      },
    }),
  }),
});

export const {
  useLazyGetLoyaltyAllRewardsListQuery,
  useAddLoyaltyRewardMutation,
  useLazyGetCustomersDropdownForRewardsQuery,
  useLazyGetTiersDropdownForRewardsQuery,
  useLazyGetVoucherDropdownForRewardsQuery,
} = loyaltyRewardsApi;
