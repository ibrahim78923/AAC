import {
  AIR_OPERATION_REPORTS_MARKETING_ALL_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_MARKETING_DASHBOARD_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_MARKETING_FAVOURITES_PERMISSIONS,
} from '@/constants/permission-keys';
import { ReportLists } from '../ReportLists';
import { GENERIC_REPORT_MODULES } from '@/constants/strings';

export const marketingReportsListTabsDynamic = (
  marketingReportsListTabsParams: any,
) => {
  return [
    {
      _id: 1,
      name: 'All Reports',
      id: 'allReports',
      tabPermissions: Object?.values(
        AIR_OPERATION_REPORTS_MARKETING_ALL_REPORTS_PERMISSIONS ?? {},
      ),
      component: ReportLists,
      componentProps: {
        _id: 1,
        name: 'All Reports',
        id: 'allReports',
        baseModule: GENERIC_REPORT_MODULES?.MARKETING,
        apiQuery: marketingReportsListTabsParams?.getReportsApiQuery,
        exportApiQuery:
          marketingReportsListTabsParams?.exportApiQueryAllReports,
        permission: AIR_OPERATION_REPORTS_MARKETING_ALL_REPORTS_PERMISSIONS,
        onRestoreClick: () =>
          marketingReportsListTabsParams?.restoreReportsPath?.(),
        editReportPath: (id: any) =>
          marketingReportsListTabsParams?.editReportPath?.(id),
      },
    },
    {
      _id: 2,
      name: 'Favorite',
      id: 'favorite',
      tabPermissions: Object?.values(
        AIR_OPERATION_REPORTS_MARKETING_FAVOURITES_PERMISSIONS ?? {},
      ),
      component: ReportLists,
      componentProps: {
        _id: 2,
        name: 'Favorite',
        id: 'favorite',
        baseModule: GENERIC_REPORT_MODULES?.MARKETING,
        apiQuery: marketingReportsListTabsParams?.getReportsApiQuery,
        exportApiQuery:
          marketingReportsListTabsParams?.exportApiQueryFavoriteReports,
        permission: AIR_OPERATION_REPORTS_MARKETING_FAVOURITES_PERMISSIONS,
        filter: [['isFavorite', true + '']],
        onRestoreClick: () =>
          marketingReportsListTabsParams?.restoreReportsPath?.(),
        editReportPath: (id: any) =>
          marketingReportsListTabsParams?.editReportPath?.(id),
      },
    },
    {
      _id: 3,
      name: 'Dashboard Reports',
      id: 'dashboardReports',
      tabPermissions: Object?.values(
        AIR_OPERATION_REPORTS_MARKETING_DASHBOARD_REPORTS_PERMISSIONS ?? {},
      ),
      component: ReportLists,
      componentProps: {
        _id: 3,
        name: 'Dashboard Reports',
        id: 'dashboardReports',
        baseModule: GENERIC_REPORT_MODULES?.MARKETING,
        onRestoreClick: () =>
          marketingReportsListTabsParams?.restoreReportsPath?.(),
        editReportPath: (id: any) =>
          marketingReportsListTabsParams?.editReportPath?.(id),
        apiQuery: marketingReportsListTabsParams?.getReportsApiQuery,
        exportApiQuery:
          marketingReportsListTabsParams?.exportApiQueryDashboardReports,
        permission:
          AIR_OPERATION_REPORTS_MARKETING_DASHBOARD_REPORTS_PERMISSIONS,
      },
    },
  ];
};
