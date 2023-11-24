import Layout from '@/layout';
import { AgentPerformanceManagement } from '@/modules/airServices/Settings/AgentPerformanceManagement';

const AgentPerformanceManagementPage = () => {
  return <AgentPerformanceManagement />;
};

export default AgentPerformanceManagementPage;

AgentPerformanceManagementPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
