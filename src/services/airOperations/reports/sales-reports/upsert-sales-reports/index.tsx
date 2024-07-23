import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = 'UPSERT_SALES_REPORT';

export const UpsertSalesReportApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
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
    salesDashboardDropdown: builder?.query({
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

export const { useLazyDealsDropdownQuery, useLazySalesDashboardDropdownQuery } =
  UpsertSalesReportApi;
