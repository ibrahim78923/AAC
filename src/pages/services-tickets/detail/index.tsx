import Layout from '@/layout';
import TicketDetail from '@/modules/ServicesTickets/SingleTicketDetail/Details/TicketDeatilsView';
const SingleTicketDetailPage = () => {
  return <TicketDetail />;
};

SingleTicketDetailPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default SingleTicketDetailPage;
