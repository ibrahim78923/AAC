import {
  AIR_OPERATION_REPORTS_SALES_ALL_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_SALES_DASHBOARD_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_SALES_FAVOURITES_PERMISSIONS,
} from '@/constants/permission-keys';

export const salesReportsListTabsDynamic = (
  salesReportsListTabsParams: any,
) => {
  return [
    {
      _id: 1,
      name: 'All Reports',
      id: 'allReports',
      apiQuery: salesReportsListTabsParams?.apiQueryAllReports,
      exportApiQuery: salesReportsListTabsParams?.exportApiQueryAllReports,
      permissions: AIR_OPERATION_REPORTS_SALES_ALL_REPORTS_PERMISSIONS,
    },
    {
      _id: 2,
      name: 'Favorite',
      id: 'favorite',
      apiQuery: salesReportsListTabsParams?.apiQueryFavoriteReports,
      exportApiQuery: salesReportsListTabsParams?.exportApiQueryFavoriteReports,
      permissions: AIR_OPERATION_REPORTS_SALES_FAVOURITES_PERMISSIONS,
    },
    {
      _id: 3,
      name: 'Dashboard Reports',
      id: 'dashboardReports',
      apiQuery: salesReportsListTabsParams?.apiQueryDashboardReports,
      exportApiQuery:
        salesReportsListTabsParams?.exportApiQueryDashboardReports,
      permissions: AIR_OPERATION_REPORTS_SALES_DASHBOARD_REPORTS_PERMISSIONS,
    },
  ];
};
