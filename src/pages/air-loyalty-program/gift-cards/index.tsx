import Layout from '@/layout';
import { GiftCards } from '@/modules/airLoyaltyProgram/GiftCards';

const GiftCardsPage = () => <GiftCards />;

export default GiftCardsPage;

GiftCardsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
