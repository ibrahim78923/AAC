import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { AccountSettings } from '@/modules/airServices/Settings/AccountSettings';

const AccountSettingsPage = () => {
  return <AccountSettings />;
};

export default AccountSettingsPage;

AccountSettingsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_ACCOUNT_DETAILS
      }
    >
      {page}
    </Layout>
  );
};
