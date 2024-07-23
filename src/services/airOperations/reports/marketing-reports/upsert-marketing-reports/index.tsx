import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = 'UPSERT_MARKETING_REPORT';

export const UpsertMarketingReportApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    marketingDashboardDropdown: builder?.query({
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

export const { useLazyMarketingDashboardDropdownQuery } =
  UpsertMarketingReportApi;
