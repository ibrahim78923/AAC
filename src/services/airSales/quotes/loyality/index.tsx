import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

const TAG = ['AIR_SALES_QUOTES'];

export const quotesLoaylityAPI = baseAPI.injectEndpoints({
  endpoints: (builder: any) => ({
    getConsumerDetail: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.GET_CONSUMER_DETAIL}/${id}`,
        method: 'GET',
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
        url: END_POINTS?.GET_GIFT_CARD_GETBY_CARD,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
  }),
});

export const {
  useGetConsumerDetailQuery,
  useCreateConsumerMutation,
  useGetRewardListQuery,
  useGetGiftCardGetBYQuery,
} = quotesLoaylityAPI;
