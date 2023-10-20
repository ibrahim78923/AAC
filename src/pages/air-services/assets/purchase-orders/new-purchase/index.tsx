import Layout from '@/layout';
import NewParchaseOrder from '@/modules/airServices/Assets/PurchaseOrders/NewParchaseOrder';

const ServicesNewPurchasePage = () => {
  return <NewParchaseOrder />;
};

ServicesNewPurchasePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default ServicesNewPurchasePage;
