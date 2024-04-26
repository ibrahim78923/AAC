import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { UserManagement } from '@/modules/airOperations/UserManagement';

const UserManagementPage = () => {
  return <UserManagement />;
};

export default UserManagementPage;

UserManagementPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_OPERATIONS_USER_MANAGEMENT_USERS_VIEW_DETAILS
      }
    >
      {page}
    </Layout>
  );
};
