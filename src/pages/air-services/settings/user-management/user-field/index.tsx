import Layout from '@/layout';
import { UserField } from '@/modules/airServices/Settings/UserManagement/UserField';

const UserFieldPage = () => {
  return <UserField />;
};

export default UserFieldPage;

UserFieldPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
