import Layout from '@/layouts/Layout';

const SuperAdminPage = () => {
  return <div>Dashboard Page</div>;
};
export default SuperAdminPage;
SuperAdminPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
