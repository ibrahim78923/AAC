import {
  AIR_OPERATION_REPORTS_MARKETING_ALL_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_MARKETING_CUSTOM_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_MARKETING_DASHBOARD_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_MARKETING_FAVOURITES_PERMISSIONS,
} from '@/constants/permission-keys';
import { ReportLists } from '../ReportLists';
import {
  DYNAMIC_REPORTS_TYPES,
  GENERIC_REPORT_MODULES,
} from '@/constants/strings';

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
        apiQuery: marketingReportsListTabsParams?.apiQueryAllReports,
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
        apiQuery: marketingReportsListTabsParams?.apiQueryFavoriteReports,
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
        apiQuery: marketingReportsListTabsParams?.apiQueryDashboardReports,
        exportApiQuery:
          marketingReportsListTabsParams?.exportApiQueryDashboardReports,
        permission:
          AIR_OPERATION_REPORTS_MARKETING_DASHBOARD_REPORTS_PERMISSIONS,
        filter: [['type', DYNAMIC_REPORTS_TYPES?.DASHBOARD]],
      },
    },
    {
      _id: 4,
      name: 'Custom Reports',
      id: 'customReports',
      apiQuery: marketingReportsListTabsParams?.getReportsApiQuery,
      exportApiQuery:
        marketingReportsListTabsParams?.exportApiQueryDashboardReports,
      permissions: AIR_OPERATION_REPORTS_MARKETING_CUSTOM_REPORTS_PERMISSIONS,
      tabPermissions: Object?.values(
        AIR_OPERATION_REPORTS_MARKETING_CUSTOM_REPORTS_PERMISSIONS ?? {},
      ),
      component: ReportLists,
      componentProps: {
        _id: 4,
        name: 'Custom Reports',
        id: 'customReports',
        baseModule: GENERIC_REPORT_MODULES?.MARKETING,
        apiQuery: marketingReportsListTabsParams?.apiQueryCustomReports,
        exportApiQuery:
          marketingReportsListTabsParams?.exportApiQueryAllReports,
        permission: AIR_OPERATION_REPORTS_MARKETING_CUSTOM_REPORTS_PERMISSIONS,
        onRestoreClick: () =>
          marketingReportsListTabsParams?.restoreReportsPath?.(),
        editReportPath: (id: any) =>
          marketingReportsListTabsParams?.editReportPath?.(id),
        filter: [['type', DYNAMIC_REPORTS_TYPES?.CUSTOM]],
      },
    },
  ];
};
