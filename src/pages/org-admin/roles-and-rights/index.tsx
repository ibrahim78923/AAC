import Layout from '@/layout';

import RolesAndRights from '@/modules/orgAdmin/RolesAndRights';

const RolesAndRightsPage = () => {
  return <RolesAndRights />;
};
export default RolesAndRightsPage;

RolesAndRightsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
