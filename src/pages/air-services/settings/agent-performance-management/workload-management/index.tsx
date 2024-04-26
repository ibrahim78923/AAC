import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { WorkloadManagement } from '@/modules/airServices/Settings/AgentPerformanceManagement/WorkloadManagement';

const WorkloadManagementPage = () => {
  return <WorkloadManagement />;
};

export default WorkloadManagementPage;

WorkloadManagementPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_AGENT_PERFORMANCE_MANAGEMENT_WORKLOAD_MANAGEMENT
      }
    >
      {page}
    </Layout>
  );
};
