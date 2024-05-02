import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { Rewards } from '@/modules/airLoyaltyProgram/Loyalty/Rewards';

const RewardsPage = () => <Rewards />;

export default RewardsPage;

RewardsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permission={Permissions?.AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS}>
      {page}
    </Layout>
  );
};
