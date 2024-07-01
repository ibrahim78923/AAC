import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useServicesReports } from './useServicesReports';
import { AIR_OPERATIONS } from '@/constants';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { ReportLists } from '../ReportLists';

export const ServicesReports = () => {
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
  } = useServicesReports();
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
          router?.push(AIR_OPERATIONS?.UPSERT_SERVICES_REPORTS);
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
        />
        <ReportLists
          apiQuery={apiQueryFavoriteReports}
          onRestoreClick={() => restoreReportsPath?.()}
          editReportPath={(id: any) => editReportPath?.(id)}
          exportApiQuery={exportApiQueryFavoriteReports}
        />
        <ReportLists
          apiQuery={apiQueryDashboardReports}
          onRestoreClick={() => restoreReportsPath?.()}
          editReportPath={(id: any) => editReportPath?.(id)}
          exportApiQuery={exportApiQueryDashboardReports}
        />
        <ReportLists
          apiQuery={apiQueryCustomReports}
          onRestoreClick={() => restoreReportsPath?.()}
          editReportPath={(id: any) => editReportPath?.(id)}
          exportApiQuery={exportApiQueryCustomReports}
        />
      </HorizontalTabs>
    </>
  );
};
