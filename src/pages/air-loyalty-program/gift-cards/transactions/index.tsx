import Layout from '@/layout';
import { GiftCardTransaction } from '@/modules/airLoyaltyProgram/GiftCards/Transactions';

const TransactionsPage = () => <GiftCardTransaction />;

export default TransactionsPage;

TransactionsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
