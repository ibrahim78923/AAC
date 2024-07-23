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

  const getReportsApiQuery = useLazyGetAllGenericReportsListQuery?.();

  const restoreReportsPath = () => {
    router?.push({
      pathname: AIR_OPERATIONS?.SALES_REPORTS_RESTORE,
    });
  };

  const editReportPath = (id: any) => {
    router?.push({
      pathname: AIR_OPERATIONS?.UPSERT_GENERIC_REPORTS,
      query: { reportId: id, moduleName: GENERIC_REPORT_MODULES?.SALES },
    });
  };

  const salesReportsListTabsParams = {
    apiQueryAllReports,
    apiQueryFavoriteReports,
    apiQueryDashboardReports,
    exportApiQueryDashboardReports,
    exportApiQueryFavoriteReports,
    exportApiQueryAllReports,
    getReportsApiQuery,
    restoreReportsPath,
    editReportPath,
  };

  const salesReportsListTabs = salesReportsListTabsDynamic(
    salesReportsListTabsParams,
  );

  const tabsArrayData = salesReportsListTabs?.map((tabs: any) => tabs?.name);

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
    editReportPath,
    tabsArrayData,
    salesReportsListTabs,
  };
};
