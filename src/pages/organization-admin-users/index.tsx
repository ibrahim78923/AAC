import Layout from '@/layout';
import UsersOrganizationAdmin from '@/modules/UsersOrganizationAdmin/UsersOrganizationAdmin';

const OrganizationAdminUsersPage = () => {
  return <UsersOrganizationAdmin />;
};
export default OrganizationAdminUsersPage;

OrganizationAdminUsersPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
