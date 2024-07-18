import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useServicesReports } from './useServicesReports';
import { AIR_OPERATIONS } from '@/constants';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';

export const ServicesReports = () => {
  const { router, servicesReportsListTabs } = useServicesReports();
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
          router?.push(AIR_OPERATIONS?.UPSERT_SERVICES_REPORTS);
        }}
      />
      <PermissionsTabs spacing={0.3} tabsDataArray={servicesReportsListTabs} />
    </>
  );
};
