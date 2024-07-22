import {
  AIR_OPERATION_REPORTS_SALES_ALL_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_SALES_DASHBOARD_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_SALES_FAVOURITES_PERMISSIONS,
} from '@/constants/permission-keys';
import { ReportLists } from '../ReportLists';
import { GENERIC_REPORT_MODULES } from '@/constants/strings';

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
      tabPermissions: Object?.values(
        AIR_OPERATION_REPORTS_SALES_ALL_REPORTS_PERMISSIONS ?? {},
      ),
      component: ReportLists,
      componentProps: {
        _id: 1,
        name: 'All Reports',
        id: 'allReports',
        baseModule: GENERIC_REPORT_MODULES?.SALES,
        apiQuery: salesReportsListTabsParams?.getReportsApiQuery,
        exportApiQuery: salesReportsListTabsParams?.exportApiQueryAllReports,
        permission: AIR_OPERATION_REPORTS_SALES_ALL_REPORTS_PERMISSIONS,
        onRestoreClick: () =>
          salesReportsListTabsParams?.restoreReportsPath?.(),
        editReportPath: (id: any) =>
          salesReportsListTabsParams?.editReportPath?.(id),
      },
    },
    {
      _id: 2,
      name: 'Favorite',
      id: 'favorite',
      apiQuery: salesReportsListTabsParams?.apiQueryFavoriteReports,
      exportApiQuery: salesReportsListTabsParams?.exportApiQueryFavoriteReports,
      permissions: AIR_OPERATION_REPORTS_SALES_FAVOURITES_PERMISSIONS,
      tabPermissions: Object?.values(
        AIR_OPERATION_REPORTS_SALES_FAVOURITES_PERMISSIONS ?? {},
      ),
      component: ReportLists,
      componentProps: {
        _id: 2,
        name: 'Favorite',
        id: 'favorite',
        baseModule: GENERIC_REPORT_MODULES?.SALES,
        apiQuery: salesReportsListTabsParams?.getReportsApiQuery,
        filter: [['isFavorite', true + '']],
        onRestoreClick: () =>
          salesReportsListTabsParams?.restoreReportsPath?.(),
        editReportPath: (id: any) =>
          salesReportsListTabsParams?.editReportPath?.(id),
        exportApiQuery:
          salesReportsListTabsParams?.exportApiQueryFavoriteReports,
        permission: AIR_OPERATION_REPORTS_SALES_FAVOURITES_PERMISSIONS,
      },
    },
    {
      _id: 3,
      name: 'Dashboard Reports',
      id: 'dashboardReports',
      apiQuery: salesReportsListTabsParams?.apiQueryDashboardReports,
      exportApiQuery:
        salesReportsListTabsParams?.exportApiQueryDashboardReports,
      permissions: AIR_OPERATION_REPORTS_SALES_DASHBOARD_REPORTS_PERMISSIONS,
      tabPermissions: Object?.values(
        AIR_OPERATION_REPORTS_SALES_DASHBOARD_REPORTS_PERMISSIONS ?? {},
      ),
      component: ReportLists,
      componentProps: {
        _id: 3,
        name: 'Dashboard Reports',
        id: 'dashboardReports',
        baseModule: GENERIC_REPORT_MODULES?.SALES,
        apiQuery: salesReportsListTabsParams?.getReportsApiQuery,
        exportApiQuery:
          salesReportsListTabsParams?.exportApiQueryFavoriteReports,
        permission: AIR_OPERATION_REPORTS_SALES_DASHBOARD_REPORTS_PERMISSIONS,
        onRestoreClick: () =>
          salesReportsListTabsParams?.restoreReportsPath?.(),
        editReportPath: (id: any) =>
          salesReportsListTabsParams?.editReportPath?.(id),
      },
    },
  ];
};
