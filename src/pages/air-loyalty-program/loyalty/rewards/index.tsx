import Layout from '@/layout';
import { Rewards } from '@/modules/airLoyaltyProgram/Loyalty/Rewards';

const RewardsPage = () => <Rewards />;

export default RewardsPage;

RewardsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
