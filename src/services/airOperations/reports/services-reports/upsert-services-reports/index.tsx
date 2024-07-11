import { END_POINTS, OPERATION } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
import { transformResponse } from '@/utils/api';
const TAG = 'UPSERT_SERVICE_REPORT';

export const UpsertServiceReportApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    postServiceReports: builder?.mutation({
      query: (payload: any) => ({
        url: `${OPERATION?.POST_GENERIC_REPORT}`,
        method: 'POST',
        body: payload,
      }),
      providesTags: [TAG],
    }),
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
    usersDropdown: builder?.query({
      query: () => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
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
      query: () => ({
        url: `${END_POINTS?.DASHBOARD_DROPDOWN}`,
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
  usePostServiceReportsMutation,
  useLazyAssetTypeDropdownQuery,
  useLazyLocationDropdownQuery,
  useLazyDepartmentDropdownQuery,
  useLazyUsersDropdownQuery,
  useLazyCategoriesDropdownQuery,
  useLazyVendorsDropdownQuery,
  useLazyDashboardDropdownQuery,
} = UpsertServiceReportApi;
