import { AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import Layout from '@/layout';
import { UpsertWorkloadSchedule } from '@/modules/airServices/Settings/AgentPerformanceManagement/WorkloadManagement/WorkloadSchedule/UpsertWorkloadSchedule';

const UpsertWorkflowManagementPage = () => {
  return <UpsertWorkloadSchedule />;
};

export default UpsertWorkflowManagementPage;

UpsertWorkflowManagementPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={[
        AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.VIEW_CREATE_EDIT_DELETE_WORK_SCHEDULED_FOR_AGENTS,
      ]}
    >
      {page}
    </Layout>
  );
};
