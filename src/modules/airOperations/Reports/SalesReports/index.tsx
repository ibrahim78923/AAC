import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_OPERATIONS } from '@/constants';
import { Button } from '@mui/material';
import { AddWhiteBgIcon } from '@/assets/icons';
import { useSalesReports } from './useSalesReports';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { ReportLists } from '../ReportLists';

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
  } = useSalesReports();

  return (
    <>
      <PageTitledHeader
        title={'Reports'}
        canMovedBack
        moveBack={() => {
          router?.push(AIR_OPERATIONS?.REPORTS);
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddWhiteBgIcon />}
          onClick={() => {
            router?.push(AIR_OPERATIONS?.UPSERT_SALES_REPORTS);
          }}
        >
          Create report
        </Button>
      </PageTitledHeader>
      <HorizontalTabs
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
          exportApiQuery={exportApiQueryAllReports}
        />
        <ReportLists
          apiQuery={apiQueryFavoriteReports}
          onRestoreClick={() => restoreReportsPath?.()}
          exportApiQuery={exportApiQueryFavoriteReports}
        />
        <ReportLists
          apiQuery={apiQueryDashboardReports}
          onRestoreClick={() => restoreReportsPath?.()}
          exportApiQuery={exportApiQueryDashboardReports}
        />
        <ReportLists
          apiQuery={apiQueryCustomReports}
          onRestoreClick={() => restoreReportsPath?.()}
          exportApiQuery={exportApiQueryCustomReports}
        />
      </HorizontalTabs>
    </>
  );
};
