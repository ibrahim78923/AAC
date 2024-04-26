import { baseAPI } from '@/services/base-api';

const giftCardDetailsApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getGiftCardDetailsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    addGiftCardDetails: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
    exportGiftCardDetailsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
    }),
    getShopDropdownForGiftCardDetails: builder?.query({
      query: ({ params }: any) => ({
        url: ``,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.shops ?? [];
      },
    }),
    getContactsDropdownForGiftCardDetails: builder?.query({
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
  useLazyGetGiftCardDetailsListQuery,
  useLazyExportGiftCardDetailsListQuery,
  useAddGiftCardDetailsMutation,
  useLazyGetContactsDropdownForGiftCardDetailsQuery,
  useLazyGetShopDropdownForGiftCardDetailsQuery,
} = giftCardDetailsApi;
