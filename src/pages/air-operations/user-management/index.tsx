import Layout from '@/layout';
import { UserManagement } from '@/modules/airOperations/UserManagement';

const UserManagementPage = () => {
  return <UserManagement />;
};

export default UserManagementPage;

UserManagementPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
