import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'VOUCHERS';

export const vouchersAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getVouchers: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_VOUCHERS}`,
        method: 'GET',
        params: apiDataParameter,
      }),
      providesTags: [TAG],
    }),
    getSingleVouchers: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_SINGLE_VOUCHERS}/${apiDataParameter}`,
        method: 'GET',
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
      query: (patchData: any) => ({
        url: `${END_POINTS?.UPDATE_VOUCHERS_STATUS}/${patchData?.id}`,
        method: 'PATCH',
        body: patchData?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getVoucherRedemptionList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_VOUCHERS}`,
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
  useGetSingleVouchersQuery,
} = vouchersAPI;
