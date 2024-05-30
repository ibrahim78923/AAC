import Layout from '@/layout';
import { UserManagement } from '@/modules/airLoyaltyProgram/UserManagement';

const UserManagementPage = () => <UserManagement />;

export default UserManagementPage;

UserManagementPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
