import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Agents from '@/modules/airServices/Settings/UserManagement/Agents';

const AgentsPage = () => {
  return <Agents />;
};

export default AgentsPage;

AgentsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT_AGENT}
    >
      {page}
    </Layout>
  );
};
