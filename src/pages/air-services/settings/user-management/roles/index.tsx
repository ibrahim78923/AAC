import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { Roles } from '@/modules/airServices/Settings/UserManagement/Roles';

const RolesPage = () => {
  return <Roles />;
};

export default RolesPage;

RolesPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT_ROLES}
    >
      {page}
    </Layout>
  );
};
