import Layout from '@/layout';

import { GiftCardsDetails } from '@/modules/airLoyaltyProgram/GiftCards/GiftCardsDetails';

const GiftCardsDetailsPage = () => <GiftCardsDetails />;

export default GiftCardsDetailsPage;

GiftCardsDetailsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
