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
    getSubscriptionsAllCrmWithSubscriptions: builder.query({
      query: () => ({
        url: `${ORG_ADMIN?.SUBSCRIPTION_AND_INVOICES_CRM}`,
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
      query: ({ id }: any) => ({
        url: `${ORG_ADMIN?.PRODUCT_PLAN_LIST}/${id}?isCrm=false`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    getCRMPlanList: builder.query({
      query: ({ name }: any) => ({
        url: `${ORG_ADMIN?.PRODUCT_CRM_PLAN_LIST}?name=${name}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    getProductFeatures: builder.query({
      query: ({ id }) => ({
        url: `${SUPER_ADMIN_PLAN_MANAGEMENT?.PRODUCT_FEATURES}?productIds=${id}&page=1&limit=1000`,
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
    postSubscriptionPlan: builder.mutation({
      query: ({ body }) => ({
        url: `${ORG_ADMIN?.SUBSCRIPTION_AND_INVOICES}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
    patchSubscriptionPlan: builder.mutation({
      query: ({ body, organizationPlanId }: any) => ({
        url: `${ORG_ADMIN?.SUBSCRIPTION_AND_INVOICES}?organizationPlanId=${organizationPlanId}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
    patchUnAssignPlan: builder.mutation({
      query: ({ organizationPlanId }: any) => ({
        url: `${ORG_ADMIN?.SUBSCRIPTION_AND_INVOICES_UN_ASSIGN_PLAN}?organizationPlanId=${organizationPlanId}`,
        method: 'PATCH',
      }),
      invalidatesTags: TAG,
    }),
    getTaxCalculations: builder.query({
      query: () => ({
        url: `${ORG_ADMIN?.SUBSCRIPTION_AND_INVOICES_TAX_CALCULATIONS}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    getPaymentCard: builder.query({
      query: ({ params }) => ({
        url: `${ORG_ADMIN?.PAYMENT_METHOD}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
    deletePaymentCard: builder.mutation({
      query: ({ ids, stripeCustomerId }: any) => ({
        url: `${ORG_ADMIN?.DELETE_PAYMENT_METHOD}?stripeCustomerId=${stripeCustomerId}&ids=${ids}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),
    postPaymentCard: builder.mutation({
      query: ({ body }) => ({
        url: `${ORG_ADMIN?.PAYMENT_METHOD}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
    getPaymentCardById: builder.query({
      query: ({ id }) => ({
        url: `${ORG_ADMIN?.PAYMENT_METHOD_ID}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    patchPaymentCard: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${ORG_ADMIN?.PAYMENT_METHOD}/${id}`,
        method: 'PATCH',
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
  useGetSubscriptionsAllCrmWithSubscriptionsQuery,
  useGetCRMPlanListQuery,
  usePostSubscriptionPlanMutation,
  usePatchSubscriptionPlanMutation,
  useGetTaxCalculationsQuery,
  usePatchUnAssignPlanMutation,
  useGetPaymentCardQuery,
  useDeletePaymentCardMutation,
  usePostPaymentCardMutation,
  useGetPaymentCardByIdQuery,
  usePatchPaymentCardMutation,
} = subscriptionAndInvoicesAPI;
