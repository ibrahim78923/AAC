import Layout from '@/layout';
import Contaracts from '@/modules/Assets/Contracts';
// import Inventory from '@/modules/Assets/Inventory';
// import { TicketsLists } from '@/modules/ServicesTickets/TicketsLists';
const ServicesTicketsPage = () => {
  return <Contaracts />;
};

ServicesTicketsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default ServicesTicketsPage;
