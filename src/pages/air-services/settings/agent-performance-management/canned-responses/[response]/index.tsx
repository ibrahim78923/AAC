import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { ResponsesList } from '@/modules/airServices/Settings/AgentPerformanceManagement/CannedResponses/ResponsesList';

const Page = () => {
  return <ResponsesList />;
};

export default Page;

Page.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_AGENT_PERFORMANCE_MANAGEMENT_CANNED_RESPONSES_LIST
      }
    >
      {page}
    </Layout>
  );
};
