import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_OPERATIONS } from '@/constants';
import { useMarketingReports } from './useMarketingReports';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { ReportLists } from '../ReportLists';
import { GENERIC_REPORT_MODULES } from '@/constants/strings';

export const MarketingReports = () => {
  const {
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
  } = useMarketingReports();
  return (
    <>
      <PageTitledHeader
        title={'Reports'}
        canMovedBack
        moveBack={() => {
          router?.push(AIR_OPERATIONS?.REPORTS);
        }}
        addTitle="Create report"
        handleAction={() => {
          router?.push(AIR_OPERATIONS?.UPSERT_MARKETING_REPORTS);
        }}
      />
      <HorizontalTabs
        spacing={0.3}
        tabsDataArray={[
          'All Reports',
          'Favorite',
          'Dashboard Reports',
          'Custom Report',
        ]}
      >
        <ReportLists
          apiQuery={apiQueryAllReports}
          onRestoreClick={() => restoreReportsPath?.()}
          editReportPath={(id: any) => editReportPath?.(id)}
          exportApiQuery={exportApiQueryAllReports}
          baseModule={GENERIC_REPORT_MODULES?.MARKETING}
        />
        <ReportLists
          apiQuery={apiQueryFavoriteReports}
          onRestoreClick={() => restoreReportsPath?.()}
          editReportPath={(id: any) => editReportPath?.(id)}
          exportApiQuery={exportApiQueryFavoriteReports}
          baseModule={GENERIC_REPORT_MODULES?.MARKETING}
        />
        <ReportLists
          apiQuery={apiQueryDashboardReports}
          onRestoreClick={() => restoreReportsPath?.()}
          editReportPath={(id: any) => editReportPath?.(id)}
          exportApiQuery={exportApiQueryDashboardReports}
          baseModule={GENERIC_REPORT_MODULES?.MARKETING}
        />
        <ReportLists
          apiQuery={apiQueryCustomReports}
          onRestoreClick={() => restoreReportsPath?.()}
          editReportPath={(id: any) => editReportPath?.(id)}
          exportApiQuery={exportApiQueryCustomReports}
          baseModule={GENERIC_REPORT_MODULES?.MARKETING}
        />
      </HorizontalTabs>
    </>
  );
};
