import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import ServicesTickets from '@/modules/airServices/ServicesTickets';

const ServicesTicketsPage = () => {
  return <ServicesTickets />;
};

ServicesTicketsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_TICKETS_TICKET_LISTS}>
      {page}
    </Layout>
  );
};

export default ServicesTicketsPage;
