import { AIR_SALES, END_POINTS, INVOICE } from '@/routesConstants/endpoints';
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
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
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

    getEmployeeListInvoice: builder.query({
      query: ({ params }: any) => {
        return {
          url: `${END_POINTS?.ORGANIZATION_LIST}/${params?.id}/users`,
          method: 'GET',
          params: {
            search: params?.search,
            meta: params?.meta,
          },
        };
      },
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: ['USERS'],
    }),

    getQuoteByIdForInvoice: builder.query({
      query: ({ id, params }: any) => ({
        url: `${END_POINTS?.QUOTE}/{id}?id=${id}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['AIR_SALES_QUOTES'],
    }),

    getBankAccountsListForInvoices: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_RECEIVERS_BANK_ACCOUNTS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.receiverbankaccounts;
      },
      providesTags: ['RECEIVER_BANK_ACCOUNT'],
    }),

    getRulesForInvoice: builder.query({
      query: ({ id, quetoAmount, amount, productQuantity }: any) => ({
        url: `${END_POINTS?.GET_RULES_FOR_INVOICES}?consumerId=${id}&quetoAmount=${quetoAmount}&amount=${amount}&productQuantity=${productQuantity}`,
        method: 'GET',
      }),
      providesTags: ['AIR_SALES_QUOTES'],
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
  useLazyGetEmployeeListInvoiceQuery,
  useLazyGetQuoteByIdForInvoiceQuery,
  useLazyGetBankAccountsListForInvoicesQuery,
  useGetRulesForInvoiceQuery,
} = invoiceAPI;
