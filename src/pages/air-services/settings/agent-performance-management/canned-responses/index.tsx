import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { CannedResponses } from '@/modules/airServices/Settings/AgentPerformanceManagement/CannedResponses';

const CannedResponsesPage = () => {
  return <CannedResponses />;
};

export default CannedResponsesPage;

CannedResponsesPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_AGENT_PERFORMANCE_MANAGEMENT_CANNED_RESPONSES
      }
    >
      {page}
    </Layout>
  );
};
