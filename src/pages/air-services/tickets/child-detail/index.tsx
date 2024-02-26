import Layout from '@/layout';
import { SingleTicketDetail } from '@/modules/airServices/ServicesTickets/SingleTicketDetail';
const SingleTicketDetailPage = () => {
  return <SingleTicketDetail />;
};

SingleTicketDetailPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default SingleTicketDetailPage;
