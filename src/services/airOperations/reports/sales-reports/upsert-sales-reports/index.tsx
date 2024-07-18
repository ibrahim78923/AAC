import { END_POINTS, OPERATION } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = 'UPSERT_SALES_REPORT';

export const UpsertSalesReportApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    postGenericReports: builder?.mutation({
      query: (payload: any) => ({
        url: `${OPERATION?.POST_GENERIC_REPORT}`,
        method: 'POST',
        body: payload,
      }),
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
    dashboardDropdown: builder?.query({
      query: () => ({
        url: `${END_POINTS?.SALES_DASHBOARD_DROPDOWN}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.salesDashboards;
      },
      providesTags: [TAG],
    }),
  }),
});

export const {
  usePostGenericReportsMutation,
  useLazyDealsDropdownQuery,
  useLazyUsersDropdownQuery,
  useLazyDashboardDropdownQuery,
} = UpsertSalesReportApi;
