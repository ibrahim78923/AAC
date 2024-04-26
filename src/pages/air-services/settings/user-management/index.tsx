import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { UserManagement } from '@/modules/airServices/Settings/UserManagement';

const UserManagementPage = () => {
  return <UserManagement />;
};

export default UserManagementPage;

UserManagementPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT}>
      {page}
    </Layout>
  );
};
