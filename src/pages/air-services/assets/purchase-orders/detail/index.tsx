import Layout from '@/layout';
import { SinglePurchaseOrderDetail } from '@/modules/airServices/Assets/PurchaseOrders/SinglePurchaseOrderDetails';
const SinglePurchaseOrderDetailPage = () => {
  return <SinglePurchaseOrderDetail />;
};

SinglePurchaseOrderDetailPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default SinglePurchaseOrderDetailPage;
