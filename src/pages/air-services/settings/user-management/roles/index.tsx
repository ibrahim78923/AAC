import Layout from '@/layout';
import { Roles } from '@/modules/airServices/Settings/UserManagement/Roles';

const RolesPage = () => {
  return <Roles />;
};

export default RolesPage;

RolesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
