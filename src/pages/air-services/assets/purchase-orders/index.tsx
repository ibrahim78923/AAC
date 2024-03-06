import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import PurchaseOrder from '@/modules/airServices/Assets/PurchaseOrders';
// import { TicketsLists } from '@/modules/ServicesTickets/TicketsLists';
const ServicesTicketsPage = () => {
  return <PurchaseOrder />;
};

ServicesTicketsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={Permissions?.AIR_SERVICES_ASSETS_PURCHASE_ORDER_LIST_VIEW}
    >
      {page}
    </Layout>
  );
};

export default ServicesTicketsPage;
