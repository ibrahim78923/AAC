import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants/routes';
import { useRouter } from 'next/router';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { workloadManagementTabs } from './WorkloadManagement.data';

export const WorkloadManagement = () => {
  const router = useRouter();

  return (
    <>
      <PageTitledHeader
        title={'Agent Productivity & Workload Management'}
        canMovedBack
        moveBack={() => {
          router?.push(AIR_SERVICES?.AGENT_PERFORMANCE_MANAGEMENT_SETTINGS);
        }}
      />

      <PermissionsTabs tabsDataArray={workloadManagementTabs} />
    </>
  );
};
