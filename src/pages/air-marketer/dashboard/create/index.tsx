import Layout from '@/layout';
import { Permissions } from '@/constants/permissions';
import CreateDashboard from '@/modules/airMarketer/Dashboard/CreateDashboard';

const CreateDashboardPage = () => {
  return <CreateDashboard />;
};
export default CreateDashboardPage;
CreateDashboardPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      guardRoute
      permissions={Permissions.AIR_MARKETER_DASHBAORD_PERMISSIONS}
    >
      {page}
    </Layout>
  );
};
