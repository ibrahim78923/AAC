import Layout from '@/layout';
import { RulesAndTiers } from '@/modules/airLoyaltyProgram/Loyalty/RulesAndTiers';

const RulesAndTiersPage = () => <RulesAndTiers />;

RulesAndTiersPage.getLayout = function getLayout(page: any) {
  return <Layout permissions={[]}>{page}</Layout>;
};

export default RulesAndTiersPage;
