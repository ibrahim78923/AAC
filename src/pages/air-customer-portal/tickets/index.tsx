import Layout from '@/layout';
import { Tickets } from '@/modules/airCustomerPortal/Tickets';

const TicketsPage = () => {
  return <Tickets />;
};
export default TicketsPage;
TicketsPage.getLayout = function getLayout(page: any) {
  return <Layout variant={'customer-portal'}>{page}</Layout>;
};
