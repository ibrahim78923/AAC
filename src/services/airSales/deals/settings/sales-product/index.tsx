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
    postSalesProduct: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.SALE_PRODUCTS}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['SETTINGS_SALE_PRODUCT'],
    }),
    updateSalesProduct: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.SALE_PRODUCTS}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['SETTINGS_SALE_PRODUCT'],
    }),
    deleteSalesProduct: builder?.mutation({
      query: ({ id }) => ({
        url: `${END_POINTS?.SALE_PRODUCTS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SETTINGS_SALE_PRODUCT'],
    }),
  }),
});

export const {
  useGetSalesProductQuery,
  usePostSalesProductMutation,
  useUpdateSalesProductMutation,
  useDeleteSalesProductMutation,
} = SalesProductAPI;
