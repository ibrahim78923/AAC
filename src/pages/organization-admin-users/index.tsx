import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import UsersOrganizationAdmin from '@/modules/UsersOrganizationAdmin/UsersOrganizationAdmin';

const OrganizationAdminUsersPage = () => {
  return <UsersOrganizationAdmin />;
};
export default OrganizationAdminUsersPage;

OrganizationAdminUsersPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
