import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'GIFT_CARD_TRANSACTION';

export const giftCardTransactionApi = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionList: builder?.query({
      query: (params) => ({
        url: END_POINTS?.GIFT_CARD_TRANSACTION,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useGetTransactionListQuery } = giftCardTransactionApi;
