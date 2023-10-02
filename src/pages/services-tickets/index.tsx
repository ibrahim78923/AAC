import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import ServicesTickets from '@/modules/ServicesTickets';
const ServicesTicketsPage = () => {
  return (
    <>
      <ServicesTickets />
    </>
  );
};

ServicesTicketsPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};

export default ServicesTicketsPage;
