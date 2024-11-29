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
      query: (id: any) => ({
        url: `${END_POINTS?.GET_SINGLE_VOUCHERS}/${id}`,
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
        url: `${END_POINTS?.UPDATE_VOUCHERS_STATUS}/${patchData?.queryParams?.id}`,
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
    deleteVoucher: builder?.mutation({
      query: (id: any) => ({
        url: `${END_POINTS?.DELETE_VOUCHERS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAG],
    }),
    vouchersTiersDropdownList: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_TIERS_LIST}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => response?.data?.mergedResults,
      providesTags: [TAG],
    }),
    editVoucher: builder?.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.UPDATE_VOUCHER}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetVouchersQuery,
  useLazyGetVouchersQuery,
  useLazyGetVoucherRedemptionListQuery,
  usePostVouchersMutation,
  usePatchVoucherMutation,
  useGetSingleVouchersQuery,
  useDeleteVoucherMutation,
  useLazyVouchersTiersDropdownListQuery,
  useEditVoucherMutation,
} = vouchersAPI;
