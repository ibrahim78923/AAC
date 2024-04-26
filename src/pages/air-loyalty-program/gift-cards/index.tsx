import Layout from '@/layout';
import { GiftCard } from '@/modules/airLoyaltyProgram/GiftCards/GiftCards';

const GiftCardsPage = () => <GiftCard />;

export default GiftCardsPage;

GiftCardsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
