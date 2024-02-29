import { PageTitledHeader } from '@/components/PageTitledHeader';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { AIR_SERVICES } from '@/constants';
import { useRouter } from 'next/router';
import { WorkloadLevel } from './WorkloadLevel';
import { RolesAndPermissions } from './RolesAndPermissions';
import { WorkloadSchedule } from './WorkloadSchedule';

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
      <HorizontalTabs
        tabsDataArray={[
          'Workload Level',
          'Roles And Permission',
          'Workload Schedule',
        ]}
      >
        <WorkloadLevel />
        <RolesAndPermissions />
        <WorkloadSchedule />
      </HorizontalTabs>
    </>
  );
};
