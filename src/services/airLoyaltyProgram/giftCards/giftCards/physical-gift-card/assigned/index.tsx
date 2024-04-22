import { baseAPI } from '@/services/base-api';

const assignedPhysicalGiftCard = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getAssignedPhysicalGiftCardList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    exportAssignedPhysicalGiftCardList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
    }),
  }),
});

export const {
  useLazyGetAssignedPhysicalGiftCardListQuery,
  useLazyExportAssignedPhysicalGiftCardListQuery,
} = assignedPhysicalGiftCard;
