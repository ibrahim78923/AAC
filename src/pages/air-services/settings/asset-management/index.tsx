import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { AssetManagement } from '@/modules/airServices/Settings/AssetManagement';

const AssetManagementPage = () => {
  return <AssetManagement />;
};

export default AssetManagementPage;

AssetManagementPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_SETTINGS_ASSET_MANAGEMENT}>
      {page}
    </Layout>
  );
};
