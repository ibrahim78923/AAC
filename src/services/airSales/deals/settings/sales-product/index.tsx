import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const SalesProductAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSalesProduct: builder.query({
      query: ({ query, page, pageLimit }) => ({
        url: `${END_POINTS?.SALE_PRODUCTS}?page=${page}&limit=${pageLimit}${query}`,
        method: 'GET',
      }),
      providesTags: ['SETTINGS_SALE_PRODUCT'],
    }),
  }),
});

export const { useGetSalesProductQuery } = SalesProductAPI;
