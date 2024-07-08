import { baseAPI } from '@/services/base-api';
import {
  AIR_MARKETER,
  END_POINTS,
  OPERATION,
  organization,
  settingSalesProductCategory,
} from '@/routesConstants/endpoints';
import { PRODUCT_USER_STATUS } from '@/constants/strings';

export const CommonAPIS = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `${END_POINTS?.PRODUCTS}?status=${PRODUCT_USER_STATUS?.active}`,
        method: 'GET',
      }),
      providesTags: ['PRODUCTS'],
    }),

    getDropdownProducts: builder.query({
      query: () => ({
        url: organization?.USERS_PRODUCTS,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: ['DROPDOWNS'],
    }),

    getDropdownProductsList: builder.query({
      query: () => ({
        url: END_POINTS?.DROPDOWN_PRODUCTS,
        method: 'GET',
      }),
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
      providesTags: ['USERS', 'PERMISSIONS'],
      transformResponse: (response: any) => {
        if (response) return response?.data?.organizationcompanyaccounts;
      },
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

    getAllTemplateList: builder.query({
      query: () => ({
        url: END_POINTS?.GET_SMS_TEMPLATES,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.smstemplates;
      },
      providesTags: ['CAMPAIGNS_LISTS'],
    }),

    getCompanyContactsList: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.CONTACTS,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.contacts;
      },
      providesTags: ['CONTACTS_LISTS'],
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

    getProductCategories: builder.query({
      query: () => ({
        url: settingSalesProductCategory?.GET_SALES_PRODUCT_CATEGORY,
        method: 'GET',
      }),
      providesTags: ['PRODUCTS_CATEGORIES'],
      transformResponse: (response: any) => {
        if (response) return response?.data?.productcategories;
      },
    }),

    getActiveProducts: builder.query({
      query: () => ({
        url: `${END_POINTS?.PRODUCTS}?status=active`,
        method: 'GET',
      }),
      providesTags: ['PRODUCTS'],
    }),

    getLifeCycleStages: builder.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.LIFECYCLE_STAGES}`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.lifecycleStages;
      },
      providesTags: ['lifeCycle'],
    }),

    getContactsStatus: builder.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.CONTACT_STATUS}`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.conatactStatus;
      },
      providesTags: ['ContactsStatus'],
    }),

    getDealPipeLine: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DEALS_PIPELINE}`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: ['DEALS_PIPELINE'],
    }),

    getDeals: builder.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.DEALS_LIST_VIEW}`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.deals;
      },
      providesTags: ['DEALS'],
    }),

    getAllCompanies: builder.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.COMPANY}`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: ['COMPANY'],
    }),

    getAllUsers: builder.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.USER_LIST}`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.users;
      },
      providesTags: ['USERS_LIST'],
    }),

    getAllTickets: builder.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: ['TICKETS'],
    }),

    getPipeline: builder.query({
      query: ({}) => ({
        url: `${END_POINTS?.DEALS_PIPELINE}?meta=true`,
        method: 'GET',
      }),
      providesTags: ['DEALS'],
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
  useLazyGetProductCategoriesQuery,
  useGetActiveProductsQuery,
  useLazyGetLifeCycleStagesQuery,
  useLazyGetContactsStatusQuery,
  useLazyGetDealPipeLineQuery,
  useLazyGetDealsQuery,
  useLazyGetCompanyContactsListQuery,
  useLazyGetAllCompaniesQuery,
  useLazyGetAllTemplateListQuery,
  useLazyGetAllUsersQuery,
  useGetDropdownProductsListQuery,
  useLazyGetAllTicketsQuery,
  useGetPipelineQuery,
} = CommonAPIS;
