import Layout from '@/layout';
import { Permissions } from '@/constants/permissions';
import Manage from '@/modules/airMarketer/Dashboard/Manage';

const ManageDashboard = () => {
  return <Manage />;
};
export default ManageDashboard;
ManageDashboard.getLayout = function getLayout(page: any) {
  return (
    <Layout
      guardRoute
      permissions={Permissions.AIR_MARKETER_DASHBAORD_PERMISSIONS}
    >
      {page}
    </Layout>
  );
};
