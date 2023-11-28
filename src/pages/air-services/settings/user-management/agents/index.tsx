import Layout from '@/layout';
import Agents from '@/modules/airServices/Settings/UserManagement/Agents';

const AgentsPage = () => {
  return <Agents />;
};

export default AgentsPage;

AgentsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
