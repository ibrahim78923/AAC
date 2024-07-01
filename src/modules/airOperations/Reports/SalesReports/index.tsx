import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_OPERATIONS } from '@/constants';
import { useSalesReports } from './useSalesReports';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { ReportLists } from '../ReportLists';
import {
  AIR_OPERATION_REPORTS_SALES_ALL_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_SALES_CUSTOM_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_SALES_DASHBOARD_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_SALES_FAVOURITES_PERMISSIONS,
} from '@/constants/permission-keys';

export const SalesReports = () => {
  const {
    router,
    apiQueryAllReports,
    apiQueryFavoriteReports,
    apiQueryDashboardReports,
    apiQueryCustomReports,
    restoreReportsPath,
    exportApiQueryCustomReports,
    exportApiQueryAllReports,
    exportApiQueryFavoriteReports,
    exportApiQueryDashboardReports,
    editReportPath,
  } = useSalesReports();

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
          router?.push(AIR_OPERATIONS?.UPSERT_SALES_REPORTS);
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
          permission={AIR_OPERATION_REPORTS_SALES_ALL_REPORTS_PERMISSIONS}
        />
        <ReportLists
          apiQuery={apiQueryFavoriteReports}
          onRestoreClick={() => restoreReportsPath?.()}
          editReportPath={(id: any) => editReportPath?.(id)}
          exportApiQuery={exportApiQueryFavoriteReports}
          permission={AIR_OPERATION_REPORTS_SALES_FAVOURITES_PERMISSIONS}
        />
        <ReportLists
          apiQuery={apiQueryDashboardReports}
          onRestoreClick={() => restoreReportsPath?.()}
          editReportPath={(id: any) => editReportPath?.(id)}
          exportApiQuery={exportApiQueryDashboardReports}
          permission={AIR_OPERATION_REPORTS_SALES_DASHBOARD_REPORTS_PERMISSIONS}
        />
        <ReportLists
          apiQuery={apiQueryCustomReports}
          onRestoreClick={() => restoreReportsPath?.()}
          editReportPath={(id: any) => editReportPath?.(id)}
          exportApiQuery={exportApiQueryCustomReports}
          permission={AIR_OPERATION_REPORTS_SALES_CUSTOM_REPORTS_PERMISSIONS}
        />
      </HorizontalTabs>
    </>
  );
};
