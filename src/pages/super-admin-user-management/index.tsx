import Layout from '@/layout';
const UserManagementPage = () => {
  return <div>User Management Page</div>;
};
export default UserManagementPage;
UserManagementPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
