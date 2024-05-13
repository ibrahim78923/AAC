import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const loyaltyTransactionsApi: any = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getLoyaltyTransactionsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_LOYALTY_TRANSACTION,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    postLoyaltyTransactions: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.ADD_LOYALTY_TRANSACTION,
        method: 'POST',
        body: apiDataParameter?.body,
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
  }),
});

export const {
  useLazyGetLoyaltyTransactionsListQuery,
  usePostLoyaltyTransactionsMutation,
  useLazyGetShopDropdownForLoyaltyTransactionQuery,
} = loyaltyTransactionsApi;
