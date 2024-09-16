import Layout from '@/layout';
import { SingleTicket } from '@/modules/airCustomerPortal/Tickets/SingleTicket';

const SingleTicketPage = () => {
  return <SingleTicket />;
};
export default SingleTicketPage;
SingleTicketPage.getLayout = function getLayout(page: any) {
  return <Layout variant={'customer-portal'}>{page}</Layout>;
};
