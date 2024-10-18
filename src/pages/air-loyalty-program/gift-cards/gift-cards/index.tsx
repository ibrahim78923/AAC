import Layout from '@/layout';
import { GiftCards } from '@/modules/airLoyaltyProgram/GiftCards/GiftCards';
import { Permissions } from '@/constants/permissions';

const GiftCardsPage = () => <GiftCards />;

export default GiftCardsPage;

GiftCardsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_LOYALTY_PROGRAM_GIFT_CARDS_GIFT_CARD}>
      {page}
    </Layout>
  );
};
