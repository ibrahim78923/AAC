import Layout from '@/layout';
import { Tickets } from '@/modules/airCustomerPortal/Tickets';

const TicketsPage = () => {
  return <Tickets />;
};

TicketsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default TicketsPage;
