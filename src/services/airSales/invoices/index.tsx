import { INVOICE } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const invoiceAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postInvoice: builder.mutation({
      query: ({ body }: any) => ({
        url: `${INVOICE.POST_INVOICE_QUOTE}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['INVOICE'],
    }),
    getInvoice: builder.query({
      query: ({ pages = 1, limit = 10, search = '' }: any) => ({
        url: `${INVOICE.GET_INVOICE_QUOTE}?page=${pages}&limit=${limit}&search=${search}`,
        method: 'GET',
      }),
      providesTags: ['INVOICE'],
    }),
    getInvoiceQoutesList: builder.query({
      query: () => ({
        url: `${INVOICE.GET_INVOICE_QUOTE_LIST}`,
        method: 'GET',
      }),
      providesTags: ['INVOICE'],
    }),
  }),
});

export const { useGetInvoiceQoutesListQuery, useGetInvoiceQuery } = invoiceAPI;
