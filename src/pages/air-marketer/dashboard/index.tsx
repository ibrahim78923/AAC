import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Dashboard from '@/modules/airMarketer/Dashboard';

const DashboardPage = () => {
  return <Dashboard />;
};
export default DashboardPage;
DashboardPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      guardRoute
      permissions={Permissions.AIR_MARKETER_DASHBAORD_PERMISSIONS}
    >
      {page}
    </Layout>
  );
};
