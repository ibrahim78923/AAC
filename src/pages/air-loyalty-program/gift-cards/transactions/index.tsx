import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { Transactions } from '@/modules/airLoyaltyProgram/GiftCards/Transactions';

const TransactionsPage = () => <Transactions />;

export default TransactionsPage;

TransactionsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={Permissions?.AIR_LOYALTY_PROGRAM_GIFT_CARDS_TRANSACTIONS}
    >
      {page}
    </Layout>
  );
};
