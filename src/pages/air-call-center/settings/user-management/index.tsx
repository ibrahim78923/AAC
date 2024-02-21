import Layout from '@/layout';
import SettingsLayout from '../layout';
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
