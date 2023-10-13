import Layout from '@/layout';
import Reports from '@/modules/Reports';

const SuperAdminReportsPage = () => {
  return <Reports />;
};
export default SuperAdminReportsPage;
SuperAdminReportsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
