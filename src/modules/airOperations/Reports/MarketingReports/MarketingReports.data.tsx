import {
  AIR_OPERATION_REPORTS_MARKETING_ALL_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_MARKETING_DASHBOARD_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_MARKETING_FAVOURITES_PERMISSIONS,
} from '@/constants/permission-keys';

export const marketingReportsListTabsDynamic = (
  marketingReportsListTabsParams: any,
) => {
  return [
    {
      _id: 1,
      name: 'All Reports',
      id: 'allReports',
      apiQuery: marketingReportsListTabsParams?.apiQueryAllReports,
      exportApiQuery: marketingReportsListTabsParams?.exportApiQueryAllReports,
      permissions: AIR_OPERATION_REPORTS_MARKETING_ALL_REPORTS_PERMISSIONS,
    },
    {
      _id: 2,
      name: 'Favorite',
      id: 'favorite',
      apiQuery: marketingReportsListTabsParams?.apiQueryFavoriteReports,
      exportApiQuery:
        marketingReportsListTabsParams?.exportApiQueryFavoriteReports,
      permissions: AIR_OPERATION_REPORTS_MARKETING_FAVOURITES_PERMISSIONS,
    },
    {
      _id: 3,
      name: 'Dashboard Reports',
      id: 'dashboardReports',
      apiQuery: marketingReportsListTabsParams?.apiQueryDashboardReports,
      exportApiQuery:
        marketingReportsListTabsParams?.exportApiQueryDashboardReports,
      permissions:
        AIR_OPERATION_REPORTS_MARKETING_DASHBOARD_REPORTS_PERMISSIONS,
    },
  ];
};
