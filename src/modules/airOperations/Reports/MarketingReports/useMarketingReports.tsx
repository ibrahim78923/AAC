import { AIR_OPERATIONS } from '@/constants';
import {
  useLazyExportAllCustomMarketingReportsListQuery,
  useLazyExportAllDashboardsMarketingReportsListQuery,
  useLazyExportAllFavoritesMarketingReportsListQuery,
  useLazyExportAllMarketingReportsListQuery,
  useLazyGetAllCustomMarketingReportsListQuery,
  useLazyGetAllDashboardsMarketingReportsListQuery,
  useLazyGetAllFavoritesMarketingReportsListQuery,
  useLazyGetAllMarketingReportsListQuery,
} from '@/services/airOperations/reports/marketing-reports';
import { useRouter } from 'next/router';

export const useMarketingReports = () => {
  const router = useRouter();
  const apiQueryAllReports = useLazyGetAllMarketingReportsListQuery?.();
  const apiQueryFavoriteReports =
    useLazyGetAllFavoritesMarketingReportsListQuery?.();
  const apiQueryDashboardReports =
    useLazyGetAllDashboardsMarketingReportsListQuery?.();
  const apiQueryCustomReports =
    useLazyGetAllCustomMarketingReportsListQuery?.();
  const exportApiQueryCustomReports =
    useLazyExportAllCustomMarketingReportsListQuery?.();
  const exportApiQueryAllReports =
    useLazyExportAllMarketingReportsListQuery?.();
  const exportApiQueryFavoriteReports =
    useLazyExportAllFavoritesMarketingReportsListQuery?.();
  const exportApiQueryDashboardReports =
    useLazyExportAllDashboardsMarketingReportsListQuery?.();

  const restoreReportsPath = () => {
    router?.push({
      pathname: AIR_OPERATIONS?.MARKETING_REPORTS_RESTORE,
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
