import { ORG_ADMIN } from '@/routesConstants/endpoints';
import { SUPER_ADMIN_PLAN_MANAGEMENT } from '@/routesConstants/paths';
import { baseAPI } from '@/services/base-api';
const TAG = ['SUBSCRIPTIONS_AND_INVOICES'];
export const subscriptionAndInvoicesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionsAndInvoices: builder.query({
      query: () => ({
        url: `${ORG_ADMIN?.SUBSCRIPTION_AND_INVOICES}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    getInvoices: builder.query({
      query: ({ params }) => ({
        url: `${ORG_ADMIN?.GET_INVOICES}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
    getInvoicesById: builder.query({
      query: ({ id }) => ({
        url: `${ORG_ADMIN?.GET_INVOICES}?organizationPlanId=${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    getProductPlanListProductId: builder.query({
      query: ({ id }) => ({
        url: `${ORG_ADMIN?.PRODUCT_PLAN_LIST}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    getProductFeatures: builder.query({
      query: ({ id }) => ({
        url: `${SUPER_ADMIN_PLAN_MANAGEMENT?.PRODUCT_FEATURES}&productId=${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    updateSubscription: builder.mutation({
      query: ({ id, body }) => ({
        url: `${ORG_ADMIN?.SUBSCRIPTION_AND_INVOICES}?organizationPlanId=${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
    postSubscription: builder.mutation({
      query: ({ id, body }) => ({
        url: `${ORG_ADMIN?.SUBSCRIPTION_AND_INVOICES}?organizationPlanId=${id}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetSubscriptionsAndInvoicesQuery,
  useGetInvoicesQuery,
  useGetInvoicesByIdQuery,
  useUpdateSubscriptionMutation,
  useGetProductPlanListProductIdQuery,
  useGetProductFeaturesQuery,
  usePostSubscriptionMutation,
} = subscriptionAndInvoicesAPI;
