import Layout from '@/layout';
import { AccountSettings } from '@/modules/airServices/Settings/AccountSettings';

const AccountSettingsPage = () => {
  return <AccountSettings />;
};

export default AccountSettingsPage;

AccountSettingsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
