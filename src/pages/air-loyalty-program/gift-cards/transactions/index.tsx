import Layout from '@/layout';
import { Transactions } from '@/modules/airLoyaltyProgram/GiftCards/Transactions';

const TransactionsPage = () => <Transactions />;

export default TransactionsPage;

TransactionsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
