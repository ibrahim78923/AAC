import Layout from '@/layout';
import { UserManagement } from '@/modules/airServices/Settings/UserManagement';

const UserManagementPage = () => {
  return <UserManagement />;
};

export default UserManagementPage;

UserManagementPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
