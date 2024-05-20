import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { ServicesReports } from '@/modules/airOperations/Reports/ServicesReports';

const ServicesReportsPage = () => {
  return <ServicesReports />;
};

export default ServicesReportsPage;

ServicesReportsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_OPERATIONS_WORKFLOWS}>{page}</Layout>
  );
};
