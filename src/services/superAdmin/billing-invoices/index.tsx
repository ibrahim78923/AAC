import { baseAPI } from '@/services/base-api';

export const bilingInvoicesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getBilingInvoices: builder.query({
      query: ({ param, query, pagination }: any) => ({
        url: `/super-admin/get-all-orgplans?${pagination}${query}`,
        method: 'GET',
        param: param,
      }),
      providesTags: ['bilingInvoices'],
    }),
    getProducts: builder.query({
      query: () => ({
        url: `/products?status=inactive`,
        method: 'GET',
      }),
      providesTags: ['bilingInvoices'],
    }),

    getBilingInvoicesById: builder.query({
      query: ({ id }: any) => ({
        url: `/biling-invoices/${id}`,
        method: 'GET',
      }),
      providesTags: ['bilingInvoices'],
    }),

    postBilingInvoices: builder.mutation({
      query: ({ body }: any) => ({
        url: `/super-admin/assign-plan`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['bilingInvoices'],
    }),

    updateBilingInvoices: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `/biling-invoices/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['bilingInvoices'],
    }),

    deleteBilingInvoices: builder.mutation({
      query: ({ id }: any) => ({
        url: `/biling-invoices/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['bilingInvoices'],
    }),
  }),
});

export const {
  useUpdateBilingInvoicesMutation,
  usePostBilingInvoicesMutation,
  useGetBilingInvoicesQuery,
  useGetProductsQuery,
  useDeleteBilingInvoicesMutation,
  useGetBilingInvoicesByIdQuery,
} = bilingInvoicesAPI;
