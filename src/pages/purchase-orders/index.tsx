import Layout from '@/layout';
import PurchaseOrder from '@/modules/Assets/PurchaseOrders';
// import { TicketsLists } from '@/modules/ServicesTickets/TicketsLists';
const ServicesTicketsPage = () => {
  return <PurchaseOrder />;
};

ServicesTicketsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default ServicesTicketsPage;
