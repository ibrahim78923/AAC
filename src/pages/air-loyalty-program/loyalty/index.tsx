import Layout from '@/layout';
import { Loyalty } from '@/modules/airLoyaltyProgram/Loyalty';

const LoyaltyPage = () => <Loyalty />;

export default LoyaltyPage;

LoyaltyPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
