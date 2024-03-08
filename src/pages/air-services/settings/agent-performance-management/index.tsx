import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { AgentPerformanceManagement } from '@/modules/airServices/Settings/AgentPerformanceManagement';

const AgentPerformanceManagementPage = () => {
  return <AgentPerformanceManagement />;
};

export default AgentPerformanceManagementPage;

AgentPerformanceManagementPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT
      }
    >
      {page}
    </Layout>
  );
};
