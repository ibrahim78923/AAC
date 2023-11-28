import Layout from '@/layout';
import { WorkloadManagement } from '@/modules/airServices/Settings/AgentPerformanceManagement/WorkloadManagement';

const WorkloadManagementPage = () => {
  return <WorkloadManagement />;
};

export default WorkloadManagementPage;

WorkloadManagementPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
