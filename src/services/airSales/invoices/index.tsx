import { INVOICE } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const transformResponse = (response: any) => {
  if (response) return response?.data?.quotes;
};

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
      query: () => ({
        url: `${INVOICE.POST_INVOICE_QUOTE}`,
        method: 'GET',
      }),
      providesTags: ['INVOICE'],
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
      transformResponse: (response: any) => transformResponse(response),
      providesTags: ['INVOICE'],
    }),
  }),
});

export const {
  useLazyGetInvoiceQoutesListQuery,
  useGetInvoiceIdQuery,
  useGetInvoiceQuery,
} = invoiceAPI;
