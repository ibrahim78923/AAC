import { AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS } from '@/constants/permission-keys';
import Layout from '@/layout';
import { SinglePurchaseOrderDetail } from '@/modules/airServices/Assets/PurchaseOrders/SinglePurchaseOrderDetails';
const SinglePurchaseOrderDetailPage = () => {
  return <SinglePurchaseOrderDetail />;
};

SinglePurchaseOrderDetailPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={[
        AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS?.VIEW_PURCAHSE_ORDER_DETAILS,
      ]}
    >
      {page}
    </Layout>
  );
};

export default SinglePurchaseOrderDetailPage;
