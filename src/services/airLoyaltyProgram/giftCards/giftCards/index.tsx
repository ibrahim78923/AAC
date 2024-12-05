import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'GIFT_CARD';

const giftCardApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getGiftCardList: builder?.query({
      query: (params: any) => ({
        url: END_POINTS?.GIFT_CARD_LIST,
        method: 'GET',
        params,
      }),
      invalidatesTags: [TAG],
    }),
    addGiftCard: builder?.mutation({
      query: (body: any) => ({
        url: END_POINTS?.POST_GIFT_CARD,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    getGiftCardDetailsList: builder?.query({
      query: (params: any) => ({
        url: END_POINTS?.SINGLE_GIFT_CARD_LIST,
        method: 'GET',
        params,
      }),
      invalidatesTags: [TAG],
    }),
    putGiftCardStatus: builder?.mutation({
      query: (patchParameter: any) => ({
        url: END_POINTS?.PUT_GIFT_CARD,
        method: 'PUT',
        params: patchParameter?.queryParams,
        body: patchParameter?.body,
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
    }),
    addGiftCardDetails: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.PUT_GIFT_CARD,
        method: 'PUT',
        params: apiDataParameter?.queryParams,
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getRecipientDropdownList: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.CONTACTS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.contacts;
      },
    }),
  }),
});
export const {
  useGetGiftCardListQuery,
  useAddGiftCardMutation,
  useGetGiftCardDetailsListQuery,
  useLazyExportGiftCardDetailsListQuery,
  useAddGiftCardDetailsMutation,
  useLazyGetRecipientDropdownListQuery,
  usePutGiftCardStatusMutation,
} = giftCardApi;
