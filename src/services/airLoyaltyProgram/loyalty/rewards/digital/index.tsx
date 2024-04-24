import { baseAPI } from '@/services/base-api';

const loyaltyDigitalRewardApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getAllLoyaltyDigitalRewardsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: '',
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
