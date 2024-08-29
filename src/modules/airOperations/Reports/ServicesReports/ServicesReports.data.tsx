import {
  AIR_OPERATION_REPORTS_SERVICES_ALL_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_SERVICES_CUSTOM_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_SERVICES_DASHBOARD_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_SERVICES_FAVOURITES_PERMISSIONS,
} from '@/constants/permission-keys';
import { ReportLists } from '../ReportLists';
import {
  DYNAMIC_REPORTS_TYPES,
  GENERIC_REPORT_MODULES,
} from '@/constants/strings';

export const servicesReportsListTabsDynamic = (
  servicesReportsListTabsParams: any,
) => {
  return [
    {
      _id: 1,
      name: 'All Reports',
      id: 'allReports',
      tabPermissions: Object?.values(
        AIR_OPERATION_REPORTS_SERVICES_ALL_REPORTS_PERMISSIONS ?? {},
      ),
      component: ReportLists,
      componentProps: {
        _id: 1,
        name: 'All Reports',
        id: 'allReports',
        baseModule: GENERIC_REPORT_MODULES?.SERVICES,
        apiQuery: servicesReportsListTabsParams?.apiQueryAllReports,
        exportApiQuery: servicesReportsListTabsParams?.exportApiQueryAllReports,
        permission: AIR_OPERATION_REPORTS_SERVICES_ALL_REPORTS_PERMISSIONS,
        onRestoreClick: () =>
          servicesReportsListTabsParams?.restoreReportsPath?.(),
        editReportPath: (id: string) =>
          servicesReportsListTabsParams?.editReportPath?.(id),
      },
    },
    {
      _id: 2,
      name: 'Favorite',
      id: 'favorite',
      tabPermissions: Object?.values(
        AIR_OPERATION_REPORTS_SERVICES_FAVOURITES_PERMISSIONS ?? {},
      ),
      component: ReportLists,
      componentProps: {
        _id: 2,
        name: 'Favorite',
        id: 'favorite',
        baseModule: GENERIC_REPORT_MODULES?.SERVICES,
        filter: [['isFavorite', true + '']],
        apiQuery: servicesReportsListTabsParams?.apiQueryFavoriteReports,
        exportApiQuery: servicesReportsListTabsParams?.exportApiQueryAllReports,
        permission: AIR_OPERATION_REPORTS_SERVICES_FAVOURITES_PERMISSIONS,
        onRestoreClick: () =>
          servicesReportsListTabsParams?.restoreReportsPath?.(),
        editReportPath: (id: string) =>
          servicesReportsListTabsParams?.editReportPath?.(id),
      },
    },
    {
      _id: 3,
      name: 'Dashboard Reports',
      id: 'dashboardReports',
      tabPermissions: Object?.values(
        AIR_OPERATION_REPORTS_SERVICES_DASHBOARD_REPORTS_PERMISSIONS ?? {},
      ),
      component: ReportLists,
      componentProps: {
        _id: 3,
        name: 'Dashboard Reports',
        id: 'dashboardReports',
        baseModule: GENERIC_REPORT_MODULES?.SERVICES,
        apiQuery: servicesReportsListTabsParams?.apiQueryDashboardReports,
        exportApiQuery: servicesReportsListTabsParams?.exportApiQueryAllReports,
        permission:
          AIR_OPERATION_REPORTS_SERVICES_DASHBOARD_REPORTS_PERMISSIONS,
        onRestoreClick: () =>
          servicesReportsListTabsParams?.restoreReportsPath?.(),
        editReportPath: (id: string) =>
          servicesReportsListTabsParams?.editReportPath?.(id),
        filter: [['type', DYNAMIC_REPORTS_TYPES?.DASHBOARD]],
      },
    },
    {
      _id: 4,
      name: 'Custom Reports',
      id: 'customReports',
      tabPermissions: Object?.values(
        AIR_OPERATION_REPORTS_SERVICES_CUSTOM_REPORTS_PERMISSIONS ?? {},
      ),
      component: ReportLists,
      componentProps: {
        _id: 4,
        name: 'Custom Reports',
        id: 'customReports',
        baseModule: GENERIC_REPORT_MODULES?.SERVICES,
        apiQuery: servicesReportsListTabsParams?.apiQueryCustomReports,
        exportApiQuery:
          servicesReportsListTabsParams?.exportApiQueryCustomReports,
        permission: AIR_OPERATION_REPORTS_SERVICES_CUSTOM_REPORTS_PERMISSIONS,
        onRestoreClick: () =>
          servicesReportsListTabsParams?.restoreReportsPath?.(),
        editReportPath: (id: string) =>
          servicesReportsListTabsParams?.editReportPath?.(id),
        filter: [['type', DYNAMIC_REPORTS_TYPES?.CUSTOM]],
      },
    },
  ];
};
