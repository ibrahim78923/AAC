import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { SalesReportsRestore } from '@/modules/airOperations/Reports/SalesReports/SalesReportsRestore';

const SalesReportsRestorePage = () => {
  return <SalesReportsRestore />;
};

export default SalesReportsRestorePage;

SalesReportsRestorePage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_OPERATION_RESTORE_REPORTS_SALES}>
      {page}
    </Layout>
  );
};
