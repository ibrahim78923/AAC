import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_OPERATIONS } from '@/constants';
import { useMarketingReports } from './useMarketingReports';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { AIR_OPERATION_REPORTS_MARKETING_CREATE_REPORTS_PERMISSIONS } from '@/constants/permission-keys';

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
        createPermissionKey={[
          AIR_OPERATION_REPORTS_MARKETING_CREATE_REPORTS_PERMISSIONS?.CREATE_REPORT_FROM_SCRATCH,
          AIR_OPERATION_REPORTS_MARKETING_CREATE_REPORTS_PERMISSIONS?.CREATE_REPORT_FROM_TEMPLATE,
        ]}
      />
      <PermissionsTabs spacing={0.3} tabsDataArray={marketingReportsListTabs} />
    </>
  );
};
