import { ORG_ADMIN } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const subscriptionAndInvoicesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionsAndInvoices: builder.query({
      query: () => ({
        url: ORG_ADMIN?.SUBSCRIPTION_AND_INVOICES,
        method: 'GET',
      }),
      providesTags: ['SUBSCRIPTIONS_AND_INVOICES'],
    }),
    getInvoices: builder.query({
      query: () => ({
        url: ORG_ADMIN?.GET_INVOICES,
        method: 'GET',
      }),
      providesTags: ['SUBSCRIPTIONS_AND_INVOICES'],
    }),
  }),
});

export const { useGetSubscriptionsAndInvoicesQuery, useGetInvoicesQuery } =
  subscriptionAndInvoicesAPI;
