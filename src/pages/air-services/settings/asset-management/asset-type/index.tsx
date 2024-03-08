import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { AssetType } from '@/modules/airServices/Settings/AssetManagement/AssetType';

const AssetTypePage = () => {
  return <AssetType />;
};

export default AssetTypePage;

AssetTypePage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_ASSET_TYPE
      }
    >
      {page}
    </Layout>
  );
};
