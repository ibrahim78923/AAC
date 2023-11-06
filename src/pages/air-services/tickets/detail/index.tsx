import Layout from '@/layout';
import { SingleTicketDetail } from '@/modules/airServices/ServicesTickets/SingleTicketDetail';
// import TicketDetail from '@/modules/TicketDeatilsView';
const SingleTicketDetailPage = () => {
  // return <TicketDetail />;
  return <SingleTicketDetail />;
};

SingleTicketDetailPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default SingleTicketDetailPage;
