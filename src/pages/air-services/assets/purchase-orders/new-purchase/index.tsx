import Layout from '@/layout';
import NewPurchaseOrder from '@/modules/airServices/Assets/PurchaseOrders/NewPurchaseOrder';

const ServicesNewPurchasePage = () => {
  return <NewPurchaseOrder />;
};

ServicesNewPurchasePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default ServicesNewPurchasePage;
