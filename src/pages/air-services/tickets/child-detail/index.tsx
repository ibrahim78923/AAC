import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { SingleTicketDetail } from '@/modules/airServices/ServicesTickets/SingleTicketDetail';
const SingleTicketDetailPage = () => {
  return <SingleTicketDetail />;
};

SingleTicketDetailPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS}>
      {page}
    </Layout>
  );
};

export default SingleTicketDetailPage;
