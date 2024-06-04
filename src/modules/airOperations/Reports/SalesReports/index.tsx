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
        <Button variant="contained" startIcon={<AddWhiteBgIcon />}>
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
        />
        <ReportLists
          apiQuery={apiQueryFavoriteReports}
          onRestoreClick={restoreReportsPath}
        />
        <ReportLists
          apiQuery={apiQueryDashboardReports}
          onRestoreClick={restoreReportsPath}
        />
        <ReportLists
          apiQuery={apiQueryCustomReports}
          onRestoreClick={restoreReportsPath}
        />
      </HorizontalTabs>
    </>
  );
};
