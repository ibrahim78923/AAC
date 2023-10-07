import Layout from '@/layout';
import TicketDetail from '@/modules/TicketDeatilsView';
const SingleTicketDetailPage = () => {
  return <TicketDetail />;
};

SingleTicketDetailPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default SingleTicketDetailPage;
