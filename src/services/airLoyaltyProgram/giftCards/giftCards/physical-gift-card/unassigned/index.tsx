import { baseAPI } from '@/services/base-api';

const unAssignedPhysicalGiftCard = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getUnAssignedPhysicalGiftCardList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    exportUnAssignedPhysicalGiftCardList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
    }),
    getRecipientsDropdownForUnAssignedPhysicalGiftCard: builder?.query({
      query: ({ params }: any) => ({
        url: ``,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.contacts ?? [];
      },
    }),
    getShopDropdownForPhysicalGiftCard: builder?.query({
      query: ({ params }: any) => ({
        url: ``,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.shops ?? [];
      },
    }),
    addPhysicalGiftCard: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
  }),
});

export const {
  useLazyGetUnAssignedPhysicalGiftCardListQuery,
  useLazyExportUnAssignedPhysicalGiftCardListQuery,
  useLazyGetRecipientsDropdownForUnAssignedPhysicalGiftCardQuery,
  useLazyGetShopDropdownForPhysicalGiftCardQuery,
  useAddPhysicalGiftCardMutation,
} = unAssignedPhysicalGiftCard;
