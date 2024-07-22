import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { SalesReports } from '@/modules/airOperations/Reports/SalesReports';

const SalesReportsPage = () => {
  return <SalesReports />;
};

export default SalesReportsPage;

SalesReportsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_OPERATION_REPORTS_SALES}>
      {page}
    </Layout>
  );
};
