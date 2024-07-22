import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { AgentFields } from '@/modules/airServices/Settings/UserManagement/AgentFields';

const AgentFieldsPage = () => {
  return <AgentFields />;
};

export default AgentFieldsPage;

AgentFieldsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT_AGENT_REQUESTER_FIELDS
      }
    >
      {page}
    </Layout>
  );
};
