import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import DefaultFields from '@/modules/airServices/Settings/AssetManagement/AssetType/DefaultFields';

const DefaultFieldsPage = () => {
  return <DefaultFields />;
};

export default DefaultFieldsPage;

DefaultFieldsPage.getLayout = function getLayout(page: any) {
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
