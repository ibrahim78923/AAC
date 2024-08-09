import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import Layout from '@/layout';
import { SingleTicketDetail } from '@/modules/airServices/ServicesTickets/SingleTicketDetail';

const SingleTicketDetailPage = () => {
  return <SingleTicketDetail />;
};

SingleTicketDetailPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={[
        AIR_SERVICES_TICKETS_TICKETS_DETAILS?.VIEW_CHILD_TICKETS_DETAILS,
      ]}
    >
      {page}
    </Layout>
  );
};

export default SingleTicketDetailPage;
