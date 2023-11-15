import Layout from '@/layout';
import { SingleTicket } from '@/modules/airCustomerPortal/Tickets/SingleTicket';

const SingleTicketPage = () => {
  return <SingleTicket />;
};

SingleTicketPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default SingleTicketPage;
