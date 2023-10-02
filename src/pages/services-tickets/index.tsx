import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
const ServicesTicketsPage = () => {
  return <>Ticket details list</>;
};

ServicesTicketsPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};

export default ServicesTicketsPage;
