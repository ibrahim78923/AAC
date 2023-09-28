import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import UserManagementSuperAdmin from '@/modules/UserManagementSuperAdmin/UserManagementSuperAdmin';

const UserManagementPage = () => {
  return <UserManagementSuperAdmin />;
};
export default UserManagementPage;
UserManagementPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
