import { baseAPI } from '@/services/base-api';
import {
  AIR_MARKETER,
  END_POINTS,
  OPERATION,
} from '@/routesConstants/endpoints';

export const CommonAPIS = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: END_POINTS?.PRODUCTS,
        method: 'GET',
      }),
      providesTags: ['PRODUCTS'],
    }),

    getDropdownProducts: builder.query({
      query: () => ({
        url: END_POINTS?.DROPDOWN_PRODUCTS,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: ['DROPDOWNS'],
    }),

    getProductsList: builder.query({
      query: () => ({
        url: END_POINTS?.PRODUCTS,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: ['PRODUCTS'],
    }),

    getOrganizations: builder.query({
      query: () => ({
        url: END_POINTS?.ORGANIZATIONS,
        method: 'GET',
      }),
      providesTags: ['ORGANIZATIONS'],
    }),

    getOrganizationsList: builder.query({
      query: () => ({
        url: END_POINTS?.ORGANIZATIONS,
        method: 'GET',
      }),
      providesTags: ['ORGANIZATIONS'],
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),

    getCompanyAccounts: builder.query({
      query: ({ orgId }: any) => ({
        url: `${END_POINTS?.GET_COMPANY_ORGANIZATION_DROPDOWN}/${orgId}${END_POINTS?.GET_COMPANY_ACCOUNTS}`,
        method: 'GET',
      }),
      providesTags: ['USERS', 'PERMISSIONS'],
    }),
    getCompanyAccountsList: builder.query({
      query: ({ orgId }: any) => ({
        url: `${END_POINTS?.GET_COMPANY_ORGANIZATION_DROPDOWN}/${orgId}${END_POINTS?.GET_COMPANY_ACCOUNTS}`,
        method: 'GET',
      }),
      providesTags: ['USERS', 'PERMISSIONS'],
    }),

    getCompanyAccountsLists: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_COMPANY_ORGANIZATION_DROPDOWN}/${params?.orgId}${END_POINTS?.GET_COMPANY_ACCOUNTS}`,
        method: 'GET',
        params: { productId: params?.productId },
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.organizationcompanyaccounts;
      },
      providesTags: ['USERS', 'PERMISSIONS'],
    }),

    getCompanyAccountsRoles: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.DROPDOWN_ACCOUNTS_ROLE,
        method: 'GET',
        params: params,
      }),
      providesTags: ['USERS', 'PERMISSIONS'],
    }),
    getCompanyAccountsRolesList: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.DROPDOWN_ACCOUNTS_ROLE,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: ['USERS', 'PERMISSIONS'],
    }),
    getDepartment: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.GET_DEPARTMENT,
        method: 'GET',
        params,
      }),
      providesTags: ['DEPARTMENT'],
    }),
    getCompanyContacts: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.CONTACTS,
        method: 'GET',
        params: params,
      }),
      providesTags: ['CONTACTS'],
    }),
    getSchemaKeys: builder.query({
      query: (params: any) => ({
        url: OPERATION?.SCHEMA_KEYS,
        method: 'GET',
        params: params,
      }),
      providesTags: ['SCHEMA_KEYS'],
    }),

    getAllCampaignsList: builder.query({
      query: () => ({
        url: AIR_MARKETER?.CAMPAIGNS,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.campaigns;
      },
      providesTags: ['CAMPAIGNS_LISTS'],
    }),

    getDealOwnersList: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.USERS_LIST_ADMIN,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.users;
      },
      providesTags: ['DEALOWNERS_LISTS'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetDropdownProductsQuery,
  useLazyGetProductsListQuery,
  useGetOrganizationsQuery,
  useLazyGetOrganizationsListQuery,
  useGetCompanyAccountsQuery,
  useLazyGetCompanyAccountsListQuery,
  useGetCompanyAccountsRolesQuery,
  useLazyGetCompanyAccountsRolesListQuery,
  useGetDepartmentQuery,
  useGetCompanyContactsQuery,
  useGetSchemaKeysQuery,
  useLazyGetCompanyAccountsListsQuery,
  useLazyGetAllCampaignsListQuery,
  useLazyGetDealOwnersListQuery,
} = CommonAPIS;
