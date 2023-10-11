import SuperAdminLayout from '@/layout/index';
import RelatedTickets from '@/modules/airServices/ServicesTickets/SingleTicketDetail/RelatedTickets';

const TestComponentsZainPage = () => {
  return (
    <>
      <RelatedTickets />
    </>
  );
};

TestComponentsZainPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
export default TestComponentsZainPage;
