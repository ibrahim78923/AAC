import Layout from '@/layout';
import { Settlements } from '@/modules/airLoyaltyProgram/GiftCards/Settlements';

const SettlementsPage = () => <Settlements />;

export default SettlementsPage;

SettlementsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
