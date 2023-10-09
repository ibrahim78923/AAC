import Layout from '@/layout';
import { SingleTicketDetail } from '@/modules/ServicesTickets/SingleTicketDetail';
import TicketDetail from '@/modules/TicketDeatilsView';
const SingleTicketDetailPage = () => {
  // return <SingleTicketDetail />;
  return <TicketDetail />;
};

SingleTicketDetailPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default SingleTicketDetailPage;
