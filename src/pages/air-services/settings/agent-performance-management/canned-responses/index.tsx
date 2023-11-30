import Layout from '@/layout';
import { CannedResponses } from '@/modules/airServices/Settings/AgentPerformanceManagement/CannedResponses';

const CannedResponsesPage = () => {
  return <CannedResponses />;
};

export default CannedResponsesPage;

CannedResponsesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
