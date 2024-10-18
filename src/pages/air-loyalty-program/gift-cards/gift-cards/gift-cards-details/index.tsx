import Layout from '@/layout';
import { GiftCardsDetails } from '@/modules/airLoyaltyProgram/GiftCards/GiftCards/GiftCardsDetails';
import { Permissions } from '@/constants/permissions';

const GiftCardsDetailsPage = () => <GiftCardsDetails />;

export default GiftCardsDetailsPage;

GiftCardsDetailsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_LOYALTY_PROGRAM_GIFT_CARDS_GIFT_CARD}>
      {page}
    </Layout>
  );
};
