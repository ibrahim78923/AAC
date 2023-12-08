import Layout from '@/layout';
import { Settled } from '@/modules/airLoyaltyProgram/GiftCards/Settled';

const SettledPage = () => <Settled />;

export default SettledPage;

SettledPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
