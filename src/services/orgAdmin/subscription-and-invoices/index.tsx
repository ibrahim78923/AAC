import { baseAPI } from '@/services/base-api';

export const subscriptionAndInvoicesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionsAndInvoices: builder.query({
      query: () => ({
        url: `/org-admin/subscriptions`,
        method: 'GET',
      }),
      providesTags: ['SUBSCRIPTIONS_AND_INVOICES'],
    }),
    getInvoices: builder.query({
      query: () => ({
        url: `/org-admin/invoices`,
        method: 'GET',
      }),
      providesTags: ['SUBSCRIPTIONS_AND_INVOICES'],
    }),
  }),
});

export const { useGetSubscriptionsAndInvoicesQuery, useGetInvoicesQuery } =
  subscriptionAndInvoicesAPI;
