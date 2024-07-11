import { END_POINTS, OPERATION } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = 'UPSERT_SALES_REPORT';

export const UpsertSalesReportApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    postSalesReports: builder?.mutation({
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
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DASHBOARD_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.dynamicdashboards;
      },
      providesTags: [TAG],
    }),
  }),
});

export const {
  usePostSalesReportsMutation,
  useLazyDealsDropdownQuery,
  useLazyUsersDropdownQuery,
  useLazyDashboardDropdownQuery,
} = UpsertSalesReportApi;
