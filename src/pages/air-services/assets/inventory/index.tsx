import Layout from '@/layout';
import Inventory from '@/modules/airServices/Assets/Inventory';
// import { TicketsLists } from '@/modules/ServicesTickets/TicketsLists';
const ServicesTicketsPage = () => {
  return <Inventory />;
};

ServicesTicketsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default ServicesTicketsPage;
