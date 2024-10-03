import { END_POINTS, OPERATION } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
import { transformResponse } from '@/utils/api';
const TAG = 'UPSERT_GENERIC_REPORT';

export const UpsertGenericReportApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    assetTypeDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_ASSET_TYPE_LIST}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => transformResponse(response),
      providesTags: [TAG],
    }),
    locationDropdown: builder?.query({
      query: () => ({
        url: `${END_POINTS?.DROPDOWN_LOCATION}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG],
    }),
    departmentDropdown: builder?.query({
      query: () => ({
        url: `${END_POINTS?.DROPDOWN_DEPARTMENT}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.departments;
      },
      providesTags: [TAG],
    }),
    categoriesDropdown: builder.query({
      query: () => ({
        url: `${END_POINTS?.CATEGORY_DROPDOWN}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.productcategories;
      },
      providesTags: [TAG],
    }),
    vendorsDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_VENDORS_LIST}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => transformResponse(response),
      providesTags: [TAG],
    }),
    dashboardDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.SERVICE_DASHBOARD_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.dynamicdashboards;
      },
      providesTags: [TAG],
    }),
    dealsDropdown: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DEALS_PIPELINE}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG],
    }),
    postGenericReports: builder?.mutation({
      query: (params: any) => ({
        url: `${OPERATION?.POST_GENERIC_REPORT}`,
        method: 'POST',
        body: params?.payload,
      }),
      providesTags: [TAG],
    }),
    usersDropdown: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG],
    }),
    patchGenericReports: builder?.mutation({
      query: (params: any) => ({
        url: `${OPERATION?.PATCH_GENERIC_REPORT}?id=${params?.id}`,
        method: 'PATCH',
        body: params?.payload,
      }),
      providesTags: [TAG],
    }),
    getSingleGenericReports: builder?.query({
      query: (params: any) => ({
        url: `${OPERATION?.GET_SINGLE_GENERIC_REPORT}?id=${params?.id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    salesDropdown: builder.query({
      query: () => ({
        url: `${END_POINTS?.SALE_PRODUCTS}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.salesproducts;
      },
      providesTags: [TAG],
    }),
    contractTypeDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.CONTRACT_TYPE_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG],
    }),
    ticketRequesterDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_TICKET_BY_REQUESTER}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
  }),
});

export const {
  usePostGenericReportsMutation,
  useLazyAssetTypeDropdownQuery,
  useLazyLocationDropdownQuery,
  useLazyDepartmentDropdownQuery,
  useLazyCategoriesDropdownQuery,
  useLazyVendorsDropdownQuery,
  useLazyDealsDropdownQuery,
  useLazyUsersDropdownQuery,
  usePatchGenericReportsMutation,
  useGetSingleGenericReportsQuery,
  useLazySalesDropdownQuery,
  useLazyDashboardDropdownQuery,
  useLazyContractTypeDropdownQuery,
  useLazyTicketRequesterDropdownQuery,
} = UpsertGenericReportApi;
