import { PageTitledHeader } from '@/components/PageTitledHeader';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { AIR_SERVICES } from '@/constants';
import { useRouter } from 'next/router';
import { RolesAndPermissions } from './RolesAndPermissions';
import { WorkloadSchedule } from './WorkloadSchedule';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

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
        tabsDataArray={['Roles And Permission', 'Workload Schedule']}
      >
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.VIEW_ROLES_AND_PERMISSIONS,
          ]}
        >
          <RolesAndPermissions />
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.VIEW_CREATE_EDIT_DELETE_WORK_SCHEDULED_FOR_AGENTS,
          ]}
        >
          <WorkloadSchedule />
        </PermissionsGuard>
      </HorizontalTabs>
    </>
  );
};
