import Layout from '@/layout';

import UsersDetailsList from '@/modules/superAdmin/UserManagement/UsersDetailsList';

const UsersListPage = () => {
  return <UsersDetailsList />;
};
export default UsersListPage;
UsersListPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
