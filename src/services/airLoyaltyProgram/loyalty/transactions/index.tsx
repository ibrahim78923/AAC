import { baseAPI } from '@/services/base-api';

const loyaltyTransactionsApi: any = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getLoyaltyTransactionsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    postLoyaltyTransactions: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
  }),
});

export const {
  useLazyGetLoyaltyTransactionsListQuery,
  usePostLoyaltyTransactionsMutation,
} = loyaltyTransactionsApi;
