import Layout from '@/layout';

import RolesAndRights from '@/modules/orgAdmin/RolesAndRights';
import { Permissions } from '@/constants/permissions';

const RolesAndRightsPage = () => {
  return <RolesAndRights />;
};
export default RolesAndRightsPage;

RolesAndRightsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions?.ORG_ADMIN_ROLE_AND_RIGHTS}>
      {page}
    </Layout>
  );
};
