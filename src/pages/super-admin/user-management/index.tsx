import Layout from '@/layout';
import UserManagementSuperAdmin from '@/modules/UserManagementSuperAdmin/UserManagementSuperAdmin';
const UserManagementPage = () => {
  return (
    <div>
      <UserManagementSuperAdmin />
    </div>
  );
};
export default UserManagementPage;
UserManagementPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
