import { superAdminBillingInvoices } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const bilingInvoicesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getBilingInvoices: builder.query({
      query: ({ params }: any) => ({
        url: `${superAdminBillingInvoices.GET_ORG_PLAN}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['bilingInvoices'],
    }),
    getProducts: builder.query({
      query: () => ({
        url: `${superAdminBillingInvoices.GET_PRODUCTS}`,
        method: 'GET',
      }),
      providesTags: ['getProducts'],
    }),

    getPlanType: builder.query({
      query: () => ({
        url: `${superAdminBillingInvoices.GET_PLAN_TYPE}`,
        method: 'GET',
      }),
      providesTags: ['getPlanType'],
    }),

    getOrganizations: builder.query({
      query: () => ({
        url: `${superAdminBillingInvoices.GET_ORGANIZATION}`,
        method: 'GET',
      }),
      providesTags: ['organizations'],
    }),

    postBilingInvoices: builder.mutation({
      query: ({ body }: any) => ({
        url: `${superAdminBillingInvoices.POST_BILING_INVOICES}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['bilingInvoices'],
    }),

    getPlanId: builder.query({
      query: ({ params }) => ({
        url: `${superAdminBillingInvoices.GET_PLAN_ID}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['bilingInvoices'],
    }),

    patchBilingInvoices: builder.mutation({
      query: ({ body, organizationPlanId }: any) => ({
        url: `${superAdminBillingInvoices.PATCH_ASSIGN_PLAN}?organizationPlanId=${organizationPlanId}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['bilingInvoices'],
    }),

    getBillingHistory: builder.query({
      query: ({ params }: any) => ({
        url: `${superAdminBillingInvoices.GET_ALL_INVOICE}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['bilingInvoices'],
    }),

    patchUpdateInvoices: builder.mutation({
      query: ({ body, invoiceId }: any) => ({
        url: `${superAdminBillingInvoices.UPDATE_INVOICE}?invoiceId=${invoiceId}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['bilingInvoices'],
    }),
    getExistingCrm: builder.query({
      query: ({ params }) => ({
        url: `${superAdminBillingInvoices.FIND_CRM}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['bilingInvoices'],
    }),
  }),
});

export const {
  usePostBilingInvoicesMutation,
  useGetBilingInvoicesQuery,
  useGetProductsQuery,
  useGetPlanTypeQuery,
  useGetOrganizationsQuery,
  useGetPlanIdQuery,
  usePatchBilingInvoicesMutation,
  useGetBillingHistoryQuery,
  usePatchUpdateInvoicesMutation,
  useGetExistingCrmQuery,
} = bilingInvoicesAPI;
