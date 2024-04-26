import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { SingleTicket } from '@/modules/airCustomerPortal/Tickets/SingleTicket';

const SingleTicketPage = () => {
  return <SingleTicket />;
};
export default SingleTicketPage;
SingleTicketPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_CUSTOMER_PORTAL_TICKETS}>
      {page}
    </Layout>
  );
};
