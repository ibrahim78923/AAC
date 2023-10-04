import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import ServicesTickets from '@/modules/ServicesTickets';
const ServicesTicketsPage = () => {
  return (
    <>
      {/* Ticket details list */}
      <ServicesTickets />
    </>
  );
};

ServicesTicketsPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};

export default ServicesTicketsPage;
