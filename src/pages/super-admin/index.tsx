import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Dashboard from '@/modules/superAdmin/Dashboard';

const SuperAdminPage = () => {
  return <Dashboard />;
};
export default SuperAdminPage;
SuperAdminPage.getLayout = function getLayout(page: any) {
  return <Layout permissions={Permissions?.view_dashoard}>{page}</Layout>;
};
