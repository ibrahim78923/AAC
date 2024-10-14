import { baseAPI } from '@/services/base-api';

const TAG = 'GIFT_CARD';

const giftCardApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getGiftCardList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
    addGiftCard: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'POST',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getGiftCardDetailsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
    exportGiftCardDetailsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
      invalidatesTags: [TAG],
    }),
    addGiftCardDetails: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'POST',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});
export const {
  useLazyGetGiftCardListQuery,
  useAddGiftCardMutation,
  useLazyGetGiftCardDetailsListQuery,
  useLazyExportGiftCardDetailsListQuery,
  useAddGiftCardDetailsMutation,
} = giftCardApi;
