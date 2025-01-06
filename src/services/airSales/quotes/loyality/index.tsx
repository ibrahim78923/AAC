import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

const TAG = ['AIR_SALES_QUOTES'];

export const quotesLoaylityAPI = baseAPI.injectEndpoints({
  endpoints: (builder: any) => ({
    getConsumerDetail: builder.query({
      query: (params: any) => ({
        url: `${END_POINTS?.GET_CONSUMER_DETAIL}/{id}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
    createConsumer: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.POST_CONSUMER,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),
    getRewardList: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.GET_REWARDS_LIST,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
    getGiftCardGetBY: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.GET_GIFT_CARD_BY_ID,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
    getExchangeRate: builder.query({
      query: (points: any) => ({
        url: `${END_POINTS?.GET_ExchangeRate}?points=${points}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    getReward: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.GET_REWARD}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    updateRedeemReward: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.UPDATE_REWARDS_QUOTES}?id=${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
    putLoyaltyProgramConsumersPointsUpdate: builder?.mutation({
      query: (body: any) => ({
        url: END_POINTS?.AIR_LOYALTY_PROGRAM_CONSUMERS_UPDATE,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    putGiftCardValue: builder?.mutation({
      query: (patchParameter: any) => ({
        url: END_POINTS?.PUT_GIFT_CARD,
        method: 'PUT',
        params: patchParameter?.queryParams,
        body: patchParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getSingleVouchersQuotes: builder?.query({
      query: (params: any) => ({
        url: `${END_POINTS?.GET_SINGLE_VOUCHERS}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    putVoucherValue: builder?.mutation({
      query: (patchParameter: any) => ({
        url: END_POINTS?.PUT_VOUCHER_REDEEM,
        method: 'PATCH',
        params: patchParameter?.queryParams,
        body: patchParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetConsumerDetailQuery,
  useCreateConsumerMutation,
  useGetRewardListQuery,
  useGetGiftCardGetBYQuery,
  useGetExchangeRateQuery,
  useGetRewardQuery,
  useUpdateRedeemRewardMutation,
  usePutLoyaltyProgramConsumersPointsUpdateMutation,
  usePutGiftCardValueMutation,
  useGetSingleVouchersQuotesQuery,
  usePutVoucherValueMutation,
} = quotesLoaylityAPI;
