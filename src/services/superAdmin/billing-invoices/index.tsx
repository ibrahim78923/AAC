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
  }),
});

export const {
  usePostBilingInvoicesMutation,
  useGetBilingInvoicesQuery,
  useGetProductsQuery,
  useGetPlanTypeQuery,
  useGetOrganizationsQuery,
} = bilingInvoicesAPI;
