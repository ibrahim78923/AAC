import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import VendorFields from '@/modules/airServices/Settings/AssetManagement/VendorFields';

const VendorFieldsPage = () => {
  return <VendorFields />;
};

export default VendorFieldsPage;

VendorFieldsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_VENDOR_FIELDS
      }
    >
      {page}
    </Layout>
  );
};
