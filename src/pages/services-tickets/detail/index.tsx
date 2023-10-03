import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
const SingleTicketDetailPage = () => {
  return <>single ticket view</>;
};

SingleTicketDetailPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};

export default SingleTicketDetailPage;
