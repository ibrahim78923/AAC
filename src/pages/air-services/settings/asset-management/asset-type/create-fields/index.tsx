import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import CreateFields from '@/modules/airServices/Settings/AssetManagement/AssetType/CreateFields';

const CreateFieldsPage = () => {
  return <CreateFields />;
};

export default CreateFieldsPage;

CreateFieldsPage.getLayout = function getLayout(page: any) {
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
