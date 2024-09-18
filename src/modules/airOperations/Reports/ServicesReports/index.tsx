import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useServicesReports } from './useServicesReports';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { AIR_OPERATION_REPORTS_SERVICES_CREATE_REPORTS_PERMISSIONS } from '@/constants/permission-keys';

export const ServicesReports = () => {
  const {
    servicesReportsListTabs,
    handleTabChange,
    moveToCreateReport,
    moveBack,
  } = useServicesReports();

  return (
    <>
      <PageTitledHeader
        title={'Reports'}
        canMovedBack
        moveBack={moveBack}
        addTitle="Create report"
        handleAction={moveToCreateReport}
        createPermissionKey={[
          AIR_OPERATION_REPORTS_SERVICES_CREATE_REPORTS_PERMISSIONS?.CREATE_REPORT_FROM_SCRATCH,
          AIR_OPERATION_REPORTS_SERVICES_CREATE_REPORTS_PERMISSIONS?.CREATE_REPORT_FROM_TEMPLATE,
        ]}
      />
      <PermissionsTabs
        spacing={0.3}
        tabsDataArray={servicesReportsListTabs}
        handleTabChange={handleTabChange}
      />
    </>
  );
};
