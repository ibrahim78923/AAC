import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';

import UserManagement from '@/modules/superAdmin/UserManagement';

const UserManagementPage = () => {
  return <UserManagement />;
};
export default UserManagementPage;

UserManagementPage.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions.user_management}>
      {page}
    </Layout>
  );
};
