import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { Tickets } from '@/modules/airCustomerPortal/Tickets';

const TicketsPage = () => {
  return <Tickets />;
};
export default TicketsPage;
TicketsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_CUSTOMER_PORTAL_TICKETS}>
      {page}
    </Layout>
  );
};
