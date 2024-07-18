import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_OPERATIONS } from '@/constants';
import { useSalesReports } from './useSalesReports';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';

export const SalesReports = () => {
  const { router, salesReportsListTabs } = useSalesReports();

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
      <PermissionsTabs spacing={0.3} tabsDataArray={salesReportsListTabs} />
    </>
  );
};
