import BankAccounts from '@/modules/orgAdmin/Settings/BankAccounts';
import SuperAdminLayout from '../../../../layout';
import { Permissions } from '@/constants/permissions';

const BankAccountsPage = () => {
  return <BankAccounts />;
};

export default BankAccountsPage;

BankAccountsPage.getLayout = function getLayout(page: any) {
  return (
    <SuperAdminLayout
      guardRoute
      permissions={Permissions?.ORG_ADMIN_SETTINGS_CONTACT_STATUS}
    >
      {page}
    </SuperAdminLayout>
  );
};
