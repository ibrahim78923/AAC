import Layout from '@/layouts/Layout';

const SuperAdminReportsPage = () => {
  return <div>Reports Page</div>;
};
export default SuperAdminReportsPage;
SuperAdminReportsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
