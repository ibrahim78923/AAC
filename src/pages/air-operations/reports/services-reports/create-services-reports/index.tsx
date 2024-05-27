import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { CreateServicesReports } from '@/modules/airOperations/Reports/ServicesReports/CreateServicesReports';

const CreateServicesReportsPage = () => {
  return <CreateServicesReports />;
};

export default CreateServicesReportsPage;

CreateServicesReportsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_OPERATIONS_WORKFLOWS}>{page}</Layout>
  );
};
