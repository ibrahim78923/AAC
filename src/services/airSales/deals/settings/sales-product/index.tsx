import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const DEALS_ASSOCIATION = 'DEALS_ASSOCIATION';
const TAG = 'SETTINGS_SALE_PRODUCT';
export const SalesProductAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSalesProduct: builder.query({
      query: ({ query, page, pageLimit }) => ({
        url: `${END_POINTS?.SALE_PRODUCTS}?page=${page}&limit=${pageLimit}${query}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getSalesProductById: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.SALE_PRODUCTS}/${id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    postSalesProduct: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.SALE_PRODUCTS}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [TAG, DEALS_ASSOCIATION],
    }),
    updateSalesProduct: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.SALE_PRODUCTS}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteSalesProduct: builder?.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.SALE_PRODUCTS}`,
        method: 'DELETE',
        body: body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetSalesProductQuery,
  usePostSalesProductMutation,
  useUpdateSalesProductMutation,
  useDeleteSalesProductMutation,
  useGetSalesProductByIdQuery,
  useLazyGetSalesProductByIdQuery,
} = SalesProductAPI;
