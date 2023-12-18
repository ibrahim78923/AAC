import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

export const CommonAPIS = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: END_POINTS?.PRODUCTS,
        method: 'GET',
      }),
      providesTags: ['PRODUCTS'],
    }),
    getOrganizations: builder.query({
      query: () => ({
        url: END_POINTS?.ORGANIZATIONS,
        method: 'GET',
      }),
      providesTags: ['PRODUCTS'],
    }),

    getCompanyAccounts: builder.query({
      query: ({ orgId }: any) => ({
        url: `${END_POINTS?.GET_COMPANY_ORGANIZATION_DROPDOWN}/${orgId}${END_POINTS?.GET_COMPANY_ACCOUNTS}`,
        method: 'GET',
      }),
      providesTags: ['PRODUCTS'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetOrganizationsQuery,
  useGetCompanyAccountsQuery,
} = CommonAPIS;
