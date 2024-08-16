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
import { marketingReportsListTabsDynamic } from './MarketingReports.data';
import { useLazyGetAllGenericReportsListQuery } from '@/services/airOperations/reports';
import { GENERIC_REPORT_MODULES } from '@/constants/strings';
import { PermissionTabsArrayI } from '@/components/Tabs/PermissionsTabs/PermissionsTabs.interface';

export const useMarketingReports = () => {
  const router = useRouter();
  const { id } = router?.query;
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

  const getReportsApiQuery = useLazyGetAllGenericReportsListQuery?.();

  const restoreReportsPath = () => {
    router?.push({
      pathname: AIR_OPERATIONS?.MARKETING_REPORTS_RESTORE,
    });
  };

  const editReportPath = (reportId: string) => {
    router?.push({
      pathname: AIR_OPERATIONS?.UPSERT_GENERIC_REPORTS,
      query: {
        id,
        reportId: reportId,
        moduleName: GENERIC_REPORT_MODULES?.MARKETING,
      },
    });
  };

  const marketingReportsListTabsParams = {
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
    exportApiQueryCustomReports,
  };

  const marketingReportsListTabs: PermissionTabsArrayI[] =
    marketingReportsListTabsDynamic(marketingReportsListTabsParams);

  return {
    router,
    marketingReportsListTabs,
    id,
  };
};
