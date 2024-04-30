import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { Transactions } from '@/modules/airLoyaltyProgram/Loyalty/Transactions';

const TransactionsPage = () => <Transactions />;

export default TransactionsPage;

TransactionsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_LOYALTY_PROGRAM_LOYALTY_TRANSACTIONS}>
      {page}
    </Layout>
  );
};
