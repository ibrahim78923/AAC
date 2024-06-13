import { AIR_SALES, INVOICE } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const invoiceAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postInvoice: builder.mutation({
      query: ({ body }: any) => ({
        url: `${AIR_SALES?.INVOICES}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['INVOICE'],
    }),
    getInvoice: builder.query({
      query: ({ params }: any) => ({
        url: `${AIR_SALES?.INVOICES}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['INVOICE'],
    }),
    getInvoiceById: builder.query({
      query: (id: any) => ({
        url: `${AIR_SALES?.INVOICES}/${id}`,
        method: 'GET',
      }),
      providesTags: ['INVOICE'],
    }),
    getInvoiceQoutesList: builder.query({
      query: ({ params }) => ({
        url: `${INVOICE.GET_INVOICE_QUOTE_LIST}`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.quotes;
      },
      providesTags: ['INVOICE', 'AIR_SALES_QUOTES'],
    }),

    deleteInvoice: builder.mutation({
      query: (id: any) => ({
        url: `${AIR_SALES?.INVOICES}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['INVOICE'],
    }),

    updateInvoice: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${AIR_SALES?.INVOICES}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['INVOICE'],
    }),
  }),
});

export const {
  usePostInvoiceMutation,
  useLazyGetInvoiceQoutesListQuery,
  useGetInvoiceByIdQuery,
  useLazyGetInvoiceByIdQuery,
  useGetInvoiceQuery,
  useDeleteInvoiceMutation,
  useUpdateInvoiceMutation,
} = invoiceAPI;
