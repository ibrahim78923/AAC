import Layout from '@/layout';

import UserManagement from '@/modules/superAdmin/UserManagement';

const UserManagementPage = () => {
  return <UserManagement />;
};
export default UserManagementPage;
UserManagementPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
