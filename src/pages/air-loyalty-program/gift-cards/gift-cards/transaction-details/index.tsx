import Layout from '@/layout';
import { GiftCardsDetails } from '@/modules/airLoyaltyProgram/GiftCards/GiftCards/GiftCardsDetails';

const TransactionDetailsPage = () => <GiftCardsDetails />;

export default TransactionDetailsPage;

TransactionDetailsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
