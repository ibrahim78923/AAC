import { AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS } from '@/constants/permission-keys';
import Layout from '@/layout';
import NewPurchaseOrder from '@/modules/airServices/Assets/PurchaseOrders/NewPurchaseOrder';

const ServicesNewPurchasePage = () => {
  return <NewPurchaseOrder />;
};

ServicesNewPurchasePage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={[
        AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS?.NEW_PURCAHSE_ORDER,
      ]}
    >
      {page}
    </Layout>
  );
};

export default ServicesNewPurchasePage;
