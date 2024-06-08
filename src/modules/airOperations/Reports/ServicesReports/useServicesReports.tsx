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

  const restoreReportsPath = () => {
    router?.push({
      pathname: AIR_OPERATIONS?.SERVICES_REPORTS_RESTORE,
    });
  };

  return {
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
  };
};
