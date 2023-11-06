import Layout from '@/layout';
import { TicketsLists } from '@/modules/airServices/ServicesTickets/TicketsLists';
const ServicesTicketsPage = () => {
  return <TicketsLists />;
};

ServicesTicketsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default ServicesTicketsPage;
