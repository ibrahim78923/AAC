import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_OPERATIONS } from '@/constants';
import { useSalesReports } from './useSalesReports';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { AIR_OPERATION_REPORTS_SALES_CREATE_REPORT_PERMISSIONS } from '@/constants/permission-keys';

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
        createPermissionKey={[
          AIR_OPERATION_REPORTS_SALES_CREATE_REPORT_PERMISSIONS?.CREATE_REPORT_FROM_SCRATCH,
          AIR_OPERATION_REPORTS_SALES_CREATE_REPORT_PERMISSIONS?.CREATE_REPORT_FROM_TEMPLATE,
        ]}
      />
      <PermissionsTabs spacing={0.3} tabsDataArray={salesReportsListTabs} />
    </>
  );
};
