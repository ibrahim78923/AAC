import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { AccountDetails } from '@/modules/airServices/Settings/AccountSettings/AccountDetails';

const AccountDetailsPage = () => {
  return <AccountDetails />;
};

export default AccountDetailsPage;

AccountDetailsPage.getLayout = function getLayout(page: any) {
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
