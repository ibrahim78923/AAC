import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import { TicketsLists } from '@/modules/ServicesTickets/TicketsLists';
const ServicesTicketsPage = () => {
  return <TicketsLists />;
};

ServicesTicketsPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};

export default ServicesTicketsPage;
