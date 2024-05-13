import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'VOUCHERS';

export const vouchersAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getVouchers: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_CANNED_RESPONSES}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    postVouchers: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.ADD_VOUCHERS}`,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    patchVoucher: builder?.mutation({
      query: (patchVoucherParameter: any) => ({
        url: `${END_POINTS?.UPDATE_CANNED_RESPONSES}`,
        method: 'PATCH',
        body: patchVoucherParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getVoucherRedemptionList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_RESPONSES_LIST}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getContactsList: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.CONTACTS}`,
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
  useGetVouchersQuery,
  useLazyGetVouchersQuery,
  useLazyGetVoucherRedemptionListQuery,
  usePostVouchersMutation,
  usePatchVoucherMutation,
  useLazyGetContactsListQuery,
} = vouchersAPI;
