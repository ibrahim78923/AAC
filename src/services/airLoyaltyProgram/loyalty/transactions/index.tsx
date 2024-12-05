import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
import { transformResponse } from '@/utils/api';

const loyaltyTransactionsApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getVoucherTransactionsList: builder?.query({
      query: (params: any) => ({
        url: END_POINTS?.GET_VOUCHER_TRANSACTION,
        method: 'GET',
        params,
      }),
    }),
    getRewardTransactionsList: builder?.query({
      query: (params: any) => ({
        url: END_POINTS?.GET_REWARDS_TRANSACTION,
        method: 'GET',
        params,
      }),
    }),
    getShopDropdownForLoyaltyTransaction: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.GET_SHOP_LIST,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.shops ?? [];
      },
    }),
    getVouchersDropdownTransaction: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_VOUCHERS}`,
        method: 'GET',
        params,
      }),
      transformResponse,
    }),
    getRewardsDropdownTransaction: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.LOYALTY_REWARDS_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) =>
        response?.data?.physicalrewards ?? [],
    }),
    getConsumerDropdownTransaction: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.CONSUMERS_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => response?.data?.consumers ?? [],
    }),
  }),
});

export const {
  useLazyGetVoucherTransactionsListQuery,
  useLazyGetRewardTransactionsListQuery,
  useLazyGetShopDropdownForLoyaltyTransactionQuery,
  useLazyGetVouchersDropdownTransactionQuery,
  useLazyGetConsumerDropdownTransactionQuery,
  useLazyGetRewardsDropdownTransactionQuery,
} = loyaltyTransactionsApi;
