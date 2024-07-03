import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import SoftwareFields from '@/modules/airServices/Settings/AssetManagement/SoftwareFields';

const SoftwareFieldsPage = () => {
  return <SoftwareFields />;
};

export default SoftwareFieldsPage;

SoftwareFieldsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_SOFTWARE_FIELDS
      }
    >
      {page}
    </Layout>
  );
};
