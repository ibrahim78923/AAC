import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'VENDOR_DETAIL_OVERVIEW';
export const vendorsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getDetailVendorsList: builder?.query({
      query: ({ vendorId }) => ({
        url: `${END_POINTS?.VENDOR_DETAIL_OVERVIEW}?id=${vendorId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useGetDetailVendorsListQuery } = vendorsAPI;
