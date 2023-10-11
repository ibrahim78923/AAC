import Layout from '@/layout';
import SuperAdminDashboard from '@/modules/superAdmin/Dashboard';

const SuperAdminPage = () => {
  return <SuperAdminDashboard />;
};
export default SuperAdminPage;
SuperAdminPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
