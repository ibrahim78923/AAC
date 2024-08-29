import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useServicesReports } from './useServicesReports';
import { AIR_OPERATIONS } from '@/constants';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { AIR_OPERATION_REPORTS_SERVICES_CREATE_REPORTS_PERMISSIONS } from '@/constants/permission-keys';
import { GENERIC_REPORT_MODULES } from '@/constants/strings';

export const ServicesReports = () => {
  const { router, servicesReportsListTabs, id } = useServicesReports();
  return (
    <>
      <PageTitledHeader
        title={'Reports'}
        canMovedBack
        moveBack={() => {
          router?.push(AIR_OPERATIONS?.REPORTS);
        }}
        addTitle="Create report"
        handleAction={() =>
          router?.push({
            pathname: AIR_OPERATIONS?.UPSERT_GENERIC_REPORTS,
            query: {
              moduleName: GENERIC_REPORT_MODULES?.SERVICES,
              id,
              redirect: router?.pathname,
            },
          })
        }
        createPermissionKey={[
          AIR_OPERATION_REPORTS_SERVICES_CREATE_REPORTS_PERMISSIONS?.CREATE_REPORT_FROM_SCRATCH,
          AIR_OPERATION_REPORTS_SERVICES_CREATE_REPORTS_PERMISSIONS?.CREATE_REPORT_FROM_TEMPLATE,
        ]}
      />
      <PermissionsTabs spacing={0.3} tabsDataArray={servicesReportsListTabs} />
    </>
  );
};
