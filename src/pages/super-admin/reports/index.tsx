import Layout from '@/layout';
import Reports from '@/modules/superAdmin/Reports';

const SuperAdminReportsPage = () => {
  return <Reports />;
};
export default SuperAdminReportsPage;
SuperAdminReportsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
