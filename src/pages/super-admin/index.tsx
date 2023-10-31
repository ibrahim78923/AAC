import Layout from '@/layout';
import Dashboard from '@/modules/superAdmin/Dashboard';

const SuperAdminPage = () => {
  return <Dashboard />;
};
export default SuperAdminPage;
SuperAdminPage.getLayout = function getLayout(page: any) {
  return <Layout guardRoute>{page}</Layout>;
};
