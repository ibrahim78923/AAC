import Layout from '@/layout';
import { RolesAndRight } from '@/modules/airLoyaltyProgram/RolesAndRight';

const RolesAndRightsPage = () => <RolesAndRight />;

export default RolesAndRightsPage;

RolesAndRightsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
