import Layout from '@/layout';
import Dashboard from '@/modules/airMarketer/Dashboard';

const DashboardPage = () => {
  return <Dashboard />;
};
export default DashboardPage;
DashboardPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
