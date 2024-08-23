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
import { salesReportsListTabsDynamic } from './SalesReports.data';
import { useLazyGetAllGenericReportsListQuery } from '@/services/airOperations/reports';
import { GENERIC_REPORT_MODULES } from '@/constants/strings';
import { PermissionTabsArrayI } from '@/components/Tabs/PermissionsTabs/PermissionsTabs.interface';

export const useSalesReports = () => {
  const router = useRouter();
  const { id } = router?.query;
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

  const getReportsApiQuery = useLazyGetAllGenericReportsListQuery?.();

  const restoreReportsPath = () => {
    router?.push({
      pathname: AIR_OPERATIONS?.SALES_REPORTS_RESTORE,
      query: {
        id,
      },
    });
  };

  const editReportPath = (reportId: string) => {
    router?.push({
      pathname: AIR_OPERATIONS?.UPSERT_GENERIC_REPORTS,
      query: {
        id,
        reportId: reportId,
        moduleName: GENERIC_REPORT_MODULES?.SALES,
      },
    });
  };

  const salesReportsListTabsParams = {
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

  const salesReportsListTabs: PermissionTabsArrayI[] =
    salesReportsListTabsDynamic(salesReportsListTabsParams);

  return {
    router,
    salesReportsListTabs,
    id,
  };
};
