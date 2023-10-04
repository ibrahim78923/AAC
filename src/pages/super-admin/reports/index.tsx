import Layout from '@/layout';

const SuperAdminReportsPage = () => {
  return <div>Reports Page</div>;
};
export default SuperAdminReportsPage;
SuperAdminReportsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
