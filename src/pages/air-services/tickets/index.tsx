import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { TicketsLists } from '@/modules/airServices/ServicesTickets/TicketsLists';
const ServicesTicketsPage = () => {
  return <TicketsLists />;
};

ServicesTicketsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_TICKETS_TICKET_LISTS}>
      {page}
    </Layout>
  );
};

export default ServicesTicketsPage;
