import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { RulesAndTiers } from '@/modules/airLoyaltyProgram/Loyalty/RulesAndTiers';

const RulesAndTiersPage = () => <RulesAndTiers />;

export default RulesAndTiersPage;

RulesAndTiersPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={Permissions?.AIR_LOYALTY_PROGRAM_LOYALTY_RULES_AND_TIERS}
    >
      {page}
    </Layout>
  );
};
