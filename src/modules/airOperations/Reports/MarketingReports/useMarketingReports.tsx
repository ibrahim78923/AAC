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

  const getReportsApiQuery = useLazyGetAllGenericReportsListQuery?.();

  const restoreReportsPath = () => {
    router?.push({
      pathname: AIR_OPERATIONS?.MARKETING_REPORTS_RESTORE,
    });
  };

  const editReportPath = (id: any) => {
    router?.push({
      pathname: AIR_OPERATIONS?.UPSERT_MARKETING_REPORTS,
      query: { reportId: id },
    });
  };

  const marketingReportsListTabsParams = {
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

  const marketingReportsListTabs = marketingReportsListTabsDynamic(
    marketingReportsListTabsParams,
  );

  const tabsArrayData = marketingReportsListTabs?.map(
    (tabs: any) => tabs?.name,
  );

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
    marketingReportsListTabs,
    tabsArrayData,
  };
};
