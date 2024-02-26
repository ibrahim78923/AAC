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
    getInvoiceId: builder.query({
      query: ({ id = '' }: any) => ({
        url: `${INVOICE.GET_QUOTE_ID}/${id}`,
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

export const { useGetInvoiceQoutesListQuery, useGetInvoiceIdQuery } =
  invoiceAPI;
