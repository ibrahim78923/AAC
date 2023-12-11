import Layout from '@/layout';
import { RulesAndTiers } from '@/modules/airLoyaltyProgram/Loyalty/RulesAndTiers';

const RulesAndTiersPage = () => <RulesAndTiers />;

export default RulesAndTiersPage;

RulesAndTiersPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
