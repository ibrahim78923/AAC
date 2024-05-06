import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { AddRewards } from '@/modules/airLoyaltyProgram/Loyalty/Rewards/AddRewards';

const AddRewardsPage = () => <AddRewards />;

export default AddRewardsPage;

AddRewardsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS}>
      {page}
    </Layout>
  );
};
