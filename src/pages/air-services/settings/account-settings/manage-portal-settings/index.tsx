import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { ManagePortalSettings } from '@/modules/airServices/Settings/AccountSettings/ManagePortalSettings';

const ManagePortalSettingsPage = () => {
  return <ManagePortalSettings />;
};

export default ManagePortalSettingsPage;

ManagePortalSettingsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={Permissions?.AIR_SERVICES_SETTINGS_MANAGE_PORTAL_SETTINGS}
    >
      {page}
    </Layout>
  );
};
