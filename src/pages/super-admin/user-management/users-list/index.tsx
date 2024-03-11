import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';

import UsersDetailsList from '@/modules/superAdmin/UserManagement/UsersDetailsList';

const UsersListPage = () => {
  return <UsersDetailsList />;
};
export default UsersListPage;
UsersListPage.getLayout = function getLayout(page: any) {
  return <Layout permissions={Permissions?.user_management}>{page}</Layout>;
};
