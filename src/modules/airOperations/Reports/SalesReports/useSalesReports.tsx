import { AIR_OPERATIONS } from '@/constants';
import {
  useLazyGetAllCustomSalesReportsListQuery,
  useLazyGetAllDashboardsSalesReportsListQuery,
  useLazyGetAllFavoritesSalesReportsListQuery,
  useLazyGetAllSalesReportsListQuery,
  useLazyExportAllSalesReportsListQuery,
  useLazyExportAllCustomSalesReportsListQuery,
  useLazyExportAllDashboardsSalesReportsListQuery,
  useLazyExportAllFavoritesSalesReportsListQuery,
} from '@/services/airOperations/reports/sales-reports';
import { useRouter } from 'next/router';

export const useSalesReports = () => {
  const router = useRouter();
  const apiQueryAllReports = useLazyGetAllSalesReportsListQuery?.();
  const apiQueryFavoriteReports =
    useLazyGetAllFavoritesSalesReportsListQuery?.();
  const apiQueryDashboardReports =
    useLazyGetAllDashboardsSalesReportsListQuery?.();
  const apiQueryCustomReports = useLazyGetAllCustomSalesReportsListQuery?.();
  const exportApiQueryCustomReports =
    useLazyExportAllCustomSalesReportsListQuery?.();
  const exportApiQueryAllReports = useLazyExportAllSalesReportsListQuery?.();
  const exportApiQueryFavoriteReports =
    useLazyExportAllFavoritesSalesReportsListQuery?.();
  const exportApiQueryDashboardReports =
    useLazyExportAllDashboardsSalesReportsListQuery?.();

  const restoreReportsPath = () => {
    router?.push({
      pathname: AIR_OPERATIONS?.SALES_REPORTS_RESTORE,
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
