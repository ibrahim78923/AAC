import Layout from '@/layout';
import { GiftCardsDetails } from '@/modules/airLoyaltyProgram/GiftCards/GiftCards/GiftCardsDetails';

const SingleDigitalGiftCardsPage = () => <GiftCardsDetails />;

export default SingleDigitalGiftCardsPage;

SingleDigitalGiftCardsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
