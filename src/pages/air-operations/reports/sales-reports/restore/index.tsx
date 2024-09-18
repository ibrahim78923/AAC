import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { RestoreReportsLists } from '@/modules/airOperations/Reports/RestoreReportsLists';

const SalesReportsRestorePage = () => {
  return <RestoreReportsLists />;
};

export default SalesReportsRestorePage;

SalesReportsRestorePage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_OPERATION_RESTORE_REPORTS_SALES}>
      {page}
    </Layout>
  );
};
