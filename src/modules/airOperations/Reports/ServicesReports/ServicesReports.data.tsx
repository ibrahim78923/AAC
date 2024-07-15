import {
  AIR_OPERATION_REPORTS_SERVICES_ALL_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_SERVICES_DASHBOARD_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_SERVICES_FAVOURITES_PERMISSIONS,
} from '@/constants/permission-keys';

export const servicesReportsListTabsDynamic = (
  servicesReportsListTabsParams: any,
) => {
  return [
    {
      _id: 1,
      name: 'All Reports',
      id: 'allReports',
      apiQuery: servicesReportsListTabsParams?.apiQueryAllReports,
      exportApiQuery: servicesReportsListTabsParams?.exportApiQueryAllReports,
      permissions: AIR_OPERATION_REPORTS_SERVICES_ALL_REPORTS_PERMISSIONS,
    },
    {
      _id: 2,
      name: 'Favorite',
      id: 'favorite',
      apiQuery: servicesReportsListTabsParams?.apiQueryFavoriteReports,
      exportApiQuery:
        servicesReportsListTabsParams?.exportApiQueryFavoriteReports,
      permissions: AIR_OPERATION_REPORTS_SERVICES_FAVOURITES_PERMISSIONS,
    },
    {
      _id: 3,
      name: 'Dashboard Reports',
      id: 'dashboardReports',
      apiQuery: servicesReportsListTabsParams?.apiQueryDashboardReports,
      exportApiQuery:
        servicesReportsListTabsParams?.exportApiQueryDashboardReports,
      permissions: AIR_OPERATION_REPORTS_SERVICES_DASHBOARD_REPORTS_PERMISSIONS,
    },
  ];
};
