import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import UpsertRoles from '@/modules/airServices/Settings/UserManagement/Roles/UpsertRoles';

const UpsertRolesPage = () => {
  return <UpsertRoles />;
};

export default UpsertRolesPage;

UpsertRolesPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT_ROLES}
    >
      {page}
    </Layout>
  );
};
