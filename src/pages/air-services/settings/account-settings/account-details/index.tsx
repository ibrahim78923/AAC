import Layout from '@/layout';
import { AccountDetails } from '@/modules/airServices/Settings/AccountSettings/AccountDetails';

const AccountDetailsPage = () => {
  return <AccountDetails />;
};

export default AccountDetailsPage;

AccountDetailsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
