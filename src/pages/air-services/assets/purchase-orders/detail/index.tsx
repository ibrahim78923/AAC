import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { SinglePurchaseOrderDetail } from '@/modules/airServices/Assets/PurchaseOrders/SinglePurchaseOrderDetails';
const SinglePurchaseOrderDetailPage = () => {
  return <SinglePurchaseOrderDetail />;
};

SinglePurchaseOrderDetailPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={Permissions?.AIR_SERVICES_ASSETS_PURCHASE_ORDER_LIST_VIEW}
    >
      {page}
    </Layout>
  );
};

export default SinglePurchaseOrderDetailPage;
