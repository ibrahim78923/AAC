import Layout from '@/layout';
import Users from '@/modules/orgAdmin/Users';

const OrganizationAdminUsersPage = () => {
  return <Users />;
};
export default OrganizationAdminUsersPage;

OrganizationAdminUsersPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
