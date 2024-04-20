import { baseAPI } from '@/services/base-api';

const digitalGiftCardApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getDigitalGiftCardList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    addDigitalGiftCard: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
    exportDigitalGiftCardList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
    }),
    getShopDropdownForDigitalGiftCard: builder?.query({
      query: ({ params }: any) => ({
        url: ``,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.shops ?? [];
      },
    }),
    getContactsDropdownForDigitalGiftCard: builder?.query({
      query: ({ params }: any) => ({
        url: ``,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.contacts ?? [];
      },
    }),
  }),
});

export const {
  useLazyGetDigitalGiftCardListQuery,
  useLazyExportDigitalGiftCardListQuery,
  useAddDigitalGiftCardMutation,
  useLazyGetContactsDropdownForDigitalGiftCardQuery,
  useLazyGetShopDropdownForDigitalGiftCardQuery,
} = digitalGiftCardApi;
