import Layout from '@/layout';
import { UpsertRolesAndRight } from '@/modules/airLoyaltyProgram/RolesAndRight/UpsertRolesAndRight';

const UpsertRolesAndRightsPage = () => <UpsertRolesAndRight />;

export default UpsertRolesAndRightsPage;

UpsertRolesAndRightsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
