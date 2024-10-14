import { OPERATION } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'GIFT_CARD_TRANSACTION';

export const giftCardTransactionApi = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionList: builder?.query({
      query: (params) => ({
        url: `${OPERATION?.OPERATION_WORKFLOW}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    postAddTransaction: builder?.mutation({
      query: (params) => ({
        url: `${OPERATION?.OPERATION_WORKFLOW}`,
        method: 'POST',
        params,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const { useLazyGetTransactionListQuery, usePostAddTransactionMutation } =
  giftCardTransactionApi;
