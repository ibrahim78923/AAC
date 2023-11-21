import { superAdminBillingInvoices } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const bilingInvoicesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getBilingInvoices: builder.query({
      query: ({ param, query, pagination }: any) => ({
        url: `${superAdminBillingInvoices.get_org_plan}${pagination}${query}`,
        method: 'GET',
        param: param,
      }),
      providesTags: ['bilingInvoices'],
    }),
    getProducts: builder.query({
      query: () => ({
        url: `${superAdminBillingInvoices.get_Products}`,
        method: 'GET',
      }),
      providesTags: ['getProducts'],
    }),

    getPlanType: builder.query({
      query: () => ({
        url: `${superAdminBillingInvoices.get_plan_type}`,
        method: 'GET',
      }),
      providesTags: ['getPlanType'],
    }),

    getOrganizations: builder.query({
      query: () => ({
        url: `${superAdminBillingInvoices.get_organizations}`,
        method: 'GET',
      }),
      providesTags: ['organizations'],
    }),

    postBilingInvoices: builder.mutation({
      query: ({ body }: any) => ({
        url: `${superAdminBillingInvoices.post_biling_invoices}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['bilingInvoices'],
    }),

    getPlanId: builder.query({
      query: ({ proId, planTypeId }) => ({
        url: `${superAdminBillingInvoices.get_plan_id}?productId=${proId}&planTypeId=${planTypeId}`,
        method: 'GET',
      }),
      providesTags: ['bilingInvoices'],
    }),

    patchBilingInvoices: builder.mutation({
      query: ({ body, organizationPlanId }: any) => ({
        url: `${superAdminBillingInvoices.patch_assign_plan}?organizationPlanId=${organizationPlanId}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['bilingInvoices'],
    }),

    getBillingHistory: builder.query({
      query: ({ pagination }: any) => ({
        url: `${superAdminBillingInvoices.get_all_invoice}?${pagination}`,
        method: 'GET',
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
} = bilingInvoicesAPI;
