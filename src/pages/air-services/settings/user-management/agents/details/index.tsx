import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { SingleAgentDetail } from '@/modules/airServices/Settings/UserManagement/Agents/SingleAgentDetail';

const AgentsDetailPage = () => {
  return <SingleAgentDetail />;
};

export default AgentsDetailPage;

AgentsDetailPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT_AGENT}
    >
      {page}
    </Layout>
  );
};
