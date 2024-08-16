import { AIR_OPERATIONS } from '@/constants';
import {
  useLazyGetAllCustomServicesReportsListQuery,
  useLazyGetAllDashboardsServicesReportsListQuery,
  useLazyGetAllFavoritesServicesReportsListQuery,
  useLazyGetAllServicesReportsListQuery,
  useLazyExportAllServicesReportsListQuery,
  useLazyExportAllCustomServicesReportsListQuery,
  useLazyExportAllDashboardsServicesReportsListQuery,
  useLazyExportAllFavoritesServicesReportsListQuery,
} from '@/services/airOperations/reports/services-reports';
import { useRouter } from 'next/router';
import { servicesReportsListTabsDynamic } from './ServicesReports.data';
import { useLazyGetAllGenericReportsListQuery } from '@/services/airOperations/reports';
import { GENERIC_REPORT_MODULES } from '@/constants/strings';
import { PermissionTabsArrayI } from '@/components/Tabs/PermissionsTabs/PermissionsTabs.interface';

export const useServicesReports = () => {
  const router = useRouter();
  const { id } = router?.query;
  const apiQueryAllReports = useLazyGetAllServicesReportsListQuery?.();
  const apiQueryFavoriteReports =
    useLazyGetAllFavoritesServicesReportsListQuery?.();
  const apiQueryDashboardReports =
    useLazyGetAllDashboardsServicesReportsListQuery?.();
  const apiQueryCustomReports = useLazyGetAllCustomServicesReportsListQuery?.();
  const exportApiQueryCustomReports =
    useLazyExportAllCustomServicesReportsListQuery?.();
  const exportApiQueryAllReports = useLazyExportAllServicesReportsListQuery?.();
  const exportApiQueryFavoriteReports =
    useLazyExportAllFavoritesServicesReportsListQuery?.();
  const exportApiQueryDashboardReports =
    useLazyExportAllDashboardsServicesReportsListQuery?.();
  const getReportsApiQuery = useLazyGetAllGenericReportsListQuery?.();

  const restoreReportsPath = () => {
    router?.push({
      pathname: AIR_OPERATIONS?.SERVICES_REPORTS_RESTORE,
    });
  };

  const editReportPath = (reportId: string) => {
    router?.push({
      pathname: AIR_OPERATIONS?.UPSERT_GENERIC_REPORTS,
      query: {
        id,
        reportId: reportId,
        moduleName: GENERIC_REPORT_MODULES?.SERVICES,
      },
    });
  };

  const servicesReportsListTabsParams = {
    apiQueryAllReports,
    apiQueryFavoriteReports,
    apiQueryDashboardReports,
    apiQueryCustomReports,
    exportApiQueryDashboardReports,
    exportApiQueryFavoriteReports,
    exportApiQueryAllReports,
    exportApiQueryCustomReports,
    getReportsApiQuery,
    restoreReportsPath,
    editReportPath,
  };

  const servicesReportsListTabs: PermissionTabsArrayI[] =
    servicesReportsListTabsDynamic(servicesReportsListTabsParams);

  return {
    router,
    servicesReportsListTabs,
    id,
  };
};
