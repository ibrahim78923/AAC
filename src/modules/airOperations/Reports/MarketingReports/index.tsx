import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_OPERATIONS } from '@/constants';
import { useMarketingReports } from './useMarketingReports';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';

export const MarketingReports = () => {
  const { router, marketingReportsListTabs } = useMarketingReports();

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
      <PermissionsTabs spacing={0.3} tabsDataArray={marketingReportsListTabs} />
    </>
  );
};
