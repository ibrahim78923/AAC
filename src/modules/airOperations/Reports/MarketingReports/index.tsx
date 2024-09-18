import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useMarketingReports } from './useMarketingReports';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { AIR_OPERATION_REPORTS_MARKETING_CREATE_REPORTS_PERMISSIONS } from '@/constants/permission-keys';

export const MarketingReports = () => {
  const {
    marketingReportsListTabs,
    handleTabChange,
    moveToCreateReport,
    moveBack,
  } = useMarketingReports();

  return (
    <>
      <PageTitledHeader
        title={'Reports'}
        canMovedBack
        moveBack={moveBack}
        addTitle="Create report"
        handleAction={moveToCreateReport}
        createPermissionKey={[
          AIR_OPERATION_REPORTS_MARKETING_CREATE_REPORTS_PERMISSIONS?.CREATE_REPORT_FROM_SCRATCH,
          AIR_OPERATION_REPORTS_MARKETING_CREATE_REPORTS_PERMISSIONS?.CREATE_REPORT_FROM_TEMPLATE,
        ]}
      />
      <PermissionsTabs
        spacing={0.3}
        tabsDataArray={marketingReportsListTabs}
        handleTabChange={handleTabChange}
      />
    </>
  );
};
