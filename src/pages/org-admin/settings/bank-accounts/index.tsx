import Layout from '@/layout';
import BankAccounts from '@/modules/orgAdmin/Settings/BankAccounts';

const BankAccountsPage = () => {
  return <BankAccounts />;
};

export default BankAccountsPage;

BankAccountsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
