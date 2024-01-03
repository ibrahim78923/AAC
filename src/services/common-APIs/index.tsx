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
      providesTags: ['ORGANIZATIONS'],
    }),

    getCompanyAccounts: builder.query({
      query: ({ orgId }: any) => ({
        url: `${END_POINTS?.GET_COMPANY_ORGANIZATION_DROPDOWN}/${orgId}${END_POINTS?.GET_COMPANY_ACCOUNTS}`,
        method: 'GET',
      }),
      providesTags: ['USERS'],
    }),

    getCompanyAccountsRoles: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.DROPDOWN_ACCOUNTS_ROLE,
        method: 'GET',
        params: params,
      }),
      providesTags: ['USERS'],
    }),

    getCompanyContacts: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.CONTACTS,
        method: 'GET',
        params: params,
      }),
      providesTags: ['CONTACTS'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetOrganizationsQuery,
  useGetCompanyAccountsQuery,
  useGetCompanyAccountsRolesQuery,
  useGetCompanyContactsQuery,
} = CommonAPIS;
