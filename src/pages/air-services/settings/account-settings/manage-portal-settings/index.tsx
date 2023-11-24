import Layout from '@/layout';
import { ManagePortalSettings } from '@/modules/airServices/Settings/AccountSettings/ManagePortalSettings';

const ManagePortalSettingsPage = () => {
  return <ManagePortalSettings />;
};

export default ManagePortalSettingsPage;

ManagePortalSettingsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
