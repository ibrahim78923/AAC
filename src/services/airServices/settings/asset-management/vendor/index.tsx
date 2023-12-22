import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'VENDOR_LIST';
export const vendorsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getVendorsList: builder?.query({
      query: ({ param }) => ({
        url: `${END_POINTS?.VENDOR_LIST}`,
        method: 'GET',
        params: param,
      }),
      providesTags: [TAG],
    }),
    getVendorsById: builder?.query({
      query: (payload: any) => ({
        url: `${END_POINTS?.VENDOR}`,
        method: 'GET',
        params: payload.params,
      }),
      providesTags: [TAG],
    }),
    postNewVendor: builder?.mutation({
      query: (payload) => ({
        url: `${END_POINTS?.POST_VENDOR}`,
        method: 'POST',
        body: payload?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getExportNewVendor: builder?.query({
      query: (getExportNewVendorParameter: any) => ({
        url: `${END_POINTS?.VENDOR_LIST}`,
        method: 'GET',
        params: getExportNewVendorParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
      providesTags: [TAG],
    }),
    patchNewVendor: builder?.mutation({
      query: (putNewVendorParameter: any) => ({
        url: `${END_POINTS?.EDIT_NEW_VENDOR}`,
        method: 'PATCH',
        body: putNewVendorParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteVendor: builder?.mutation({
      query: (deleteVendorParameter: any) => ({
        url: `${END_POINTS?.DELETE_NEW_VENDOR}`,
        method: 'DELETE',
        params: deleteVendorParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetVendorsListQuery,
  useGetVendorsByIdQuery,
  usePostNewVendorMutation,
  useLazyGetExportNewVendorQuery,
  usePatchNewVendorMutation,
  useDeleteVendorMutation,
  useLazyGetVendorsByIdQuery,
} = vendorsAPI;
