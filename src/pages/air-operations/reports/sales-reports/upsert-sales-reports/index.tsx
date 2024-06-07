import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { UpsertSalesReports } from '@/modules/airOperations/Reports/SalesReports/UpsertSalesReports';

const UpsertSalesReportsPage = () => {
  return <UpsertSalesReports />;
};

export default UpsertSalesReportsPage;

UpsertSalesReportsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_OPERATIONS_WORKFLOWS}>{page}</Layout>
  );
};
