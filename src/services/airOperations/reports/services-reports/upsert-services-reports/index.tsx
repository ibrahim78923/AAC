import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
import { transformResponse } from '@/utils/api';
const TAG = 'UPSERT_SERVICE_REPORT';

export const UpsertServiceReportApi = baseAPI?.injectEndpoints({
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
    serviceDashboardDropdown: builder?.query({
      query: () => ({
        url: `${END_POINTS?.SERVICE_DASHBOARD_DROPDOWN}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response) return response?.dynamicdashboards;
      },
      providesTags: [TAG],
    }),
  }),
});

export const {
  useLazyAssetTypeDropdownQuery,
  useLazyLocationDropdownQuery,
  useLazyDepartmentDropdownQuery,
  useLazyCategoriesDropdownQuery,
  useLazyVendorsDropdownQuery,
  useLazyServiceDashboardDropdownQuery,
} = UpsertServiceReportApi;
