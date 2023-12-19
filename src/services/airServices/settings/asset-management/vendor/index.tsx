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
  }),
});

export const { useGetVendorsListQuery } = vendorsAPI;
