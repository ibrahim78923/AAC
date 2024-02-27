import Layout from '@/layout';
import SettingsLayout from '@/layout/SettingsLayout/Layout';
import UserManagement from '@/modules/airCallCenter/Settings/UserManagement';

const UserManagementPage = () => {
  return <UserManagement />;
};
export default UserManagementPage;

UserManagementPage.getLayout = (page: any) => (
  <Layout>
    <SettingsLayout>{page}</SettingsLayout>
  </Layout>
);
