import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { Settings } from '@/modules/airLoyaltyProgram/Settings';

const SettingsPage = () => <Settings />;

export default SettingsPage;

SettingsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_LOYALTY_PROGRAM_SETTINGS_ACCOUNT ||
        Permissions?.AIR_LOYALTY_PROGRAM_SETTINGS_MANAGEMENT
      }
    >
      {page}
    </Layout>
  );
};
