import Layout from '@/layout';
import UpsertRoles from '@/modules/airServices/Settings/UserManagement/Roles/UpsertRoles';

const UpsertRolesPage = () => {
  return <UpsertRoles />;
};

export default UpsertRolesPage;

UpsertRolesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
