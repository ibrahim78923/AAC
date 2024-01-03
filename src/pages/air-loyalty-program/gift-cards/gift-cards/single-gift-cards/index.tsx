import Layout from '@/layout';
import { GiftCardsDetails } from '@/modules/airLoyaltyProgram/GiftCards/GiftCardsDetails';

const GiftCardsPage = () => <GiftCardsDetails />;

export default GiftCardsPage;

GiftCardsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
