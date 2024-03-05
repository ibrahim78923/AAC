import { AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS } from '@/constants/permission-keys';
import Layout from '@/layout';
import PurchaseOrder from '@/modules/airServices/Assets/PurchaseOrders';
// import { TicketsLists } from '@/modules/ServicesTickets/TicketsLists';
const ServicesTicketsPage = () => {
  return <PurchaseOrder />;
};

ServicesTicketsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permission={[AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS]}>
      {page}
    </Layout>
  );
};

export default ServicesTicketsPage;
