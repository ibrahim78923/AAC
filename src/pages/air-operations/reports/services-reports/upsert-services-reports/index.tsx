import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { UpsertServicesReports } from '@/modules/airOperations/Reports/ServicesReports/UpsertServicesReports';

const UpsertServicesReportsPage = () => {
  return <UpsertServicesReports />;
};

export default UpsertServicesReportsPage;

UpsertServicesReportsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_OPERATIONS_WORKFLOWS}>{page}</Layout>
  );
};
