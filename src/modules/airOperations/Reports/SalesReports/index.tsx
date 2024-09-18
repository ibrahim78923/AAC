import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useSalesReports } from './useSalesReports';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { AIR_OPERATION_REPORTS_SALES_CREATE_REPORT_PERMISSIONS } from '@/constants/permission-keys';

export const SalesReports = () => {
  const {
    salesReportsListTabs,
    handleTabChange,
    moveToCreateReport,
    moveBack,
  } = useSalesReports();

  return (
    <>
      <PageTitledHeader
        title={'Reports'}
        canMovedBack
        moveBack={moveBack}
        addTitle="Create report"
        handleAction={moveToCreateReport}
        createPermissionKey={[
          AIR_OPERATION_REPORTS_SALES_CREATE_REPORT_PERMISSIONS?.CREATE_REPORT_FROM_SCRATCH,
          AIR_OPERATION_REPORTS_SALES_CREATE_REPORT_PERMISSIONS?.CREATE_REPORT_FROM_TEMPLATE,
        ]}
      />
      <PermissionsTabs
        spacing={0.3}
        tabsDataArray={salesReportsListTabs}
        handleTabChange={handleTabChange}
      />
    </>
  );
};
