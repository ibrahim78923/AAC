import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import PurchaseOrderFields from '@/modules/airServices/Settings/AssetManagement/PurchaseOrderFields';

const PurchaseOrderFieldsPage = () => {
  return <PurchaseOrderFields />;
};

export default PurchaseOrderFieldsPage;

PurchaseOrderFieldsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PURCHASE_ORDER_FIELDS
      }
    >
      {page}
    </Layout>
  );
};
