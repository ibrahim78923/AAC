import { AIR_OPERATIONS } from '@/constants';
import {
  useLazyGetAllCustomSalesReportsListQuery,
  useLazyGetAllDashboardsSalesReportsListQuery,
  useLazyGetAllFavouritesSalesReportsListQuery,
  useLazyGetAllSalesReportsListQuery,
} from '@/services/airOperations/reports/sales-reports';
import { useRouter } from 'next/router';

export const useSalesReports = () => {
  const router = useRouter();
  const apiQueryAllReports = useLazyGetAllSalesReportsListQuery?.();
  const apiQueryFavoriteReports =
    useLazyGetAllFavouritesSalesReportsListQuery?.();
  const apiQueryDashboardReports =
    useLazyGetAllDashboardsSalesReportsListQuery?.();
  const apiQueryCustomReports = useLazyGetAllCustomSalesReportsListQuery?.();

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
    restoreReportsPath,
  };
};
