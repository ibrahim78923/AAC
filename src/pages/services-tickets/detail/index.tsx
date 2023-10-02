import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import { SingleTicketDetail } from '@/modules/ServicesTickets/SingleTicketDetail';
const SingleTicketDetailPage = () => {
  return <SingleTicketDetail />;
};

SingleTicketDetailPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};

export default SingleTicketDetailPage;
