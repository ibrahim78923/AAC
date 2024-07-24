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

export const useServicesReports = () => {
  const router = useRouter();
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

  const editReportPath = (id: any) => {
    router?.push({
      pathname: AIR_OPERATIONS?.UPSERT_GENERIC_REPORTS,
      query: { reportId: id, moduleName: GENERIC_REPORT_MODULES?.SERVICES },
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
    getReportsApiQuery,
    restoreReportsPath,
    editReportPath,
  };

  const servicesReportsListTabs = servicesReportsListTabsDynamic(
    servicesReportsListTabsParams,
  );

  const tabsArrayData = servicesReportsListTabs?.map((tabs: any) => tabs?.name);

  return {
    servicesReportsListTabs,
    tabsArrayData,
    router,
    apiQueryAllReports,
    apiQueryFavoriteReports,
    apiQueryDashboardReports,
    apiQueryCustomReports,
    exportApiQueryCustomReports,
    exportApiQueryAllReports,
    exportApiQueryFavoriteReports,
    exportApiQueryDashboardReports,
    restoreReportsPath,
    editReportPath,
  };
};
