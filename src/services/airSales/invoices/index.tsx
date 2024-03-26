import { AIR_SALES, INVOICE } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const transformResponse = (response: any) => {
  if (response) return response?.data?.quotes;
};

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
      query: () => ({
        url: `${INVOICE.GET_INVOICE_QUOTE_LIST}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => transformResponse(response),
      providesTags: ['INVOICE'],
    }),

    deleteInvoice: builder.mutation({
      query: (id: any) => ({
        url: `${AIR_SALES?.INVOICES}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['INVOICE'],
    }),
  }),
});

export const {
  usePostInvoiceMutation,
  useLazyGetInvoiceQoutesListQuery,
  useGetInvoiceByIdQuery,
  useGetInvoiceQuery,
  useDeleteInvoiceMutation,
} = invoiceAPI;
