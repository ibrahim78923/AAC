import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { RestoreReportsLists } from '@/modules/airOperations/RestoreReports/RestoreReportsLists';

const RestoreReportsListsPage = () => <RestoreReportsLists />;

export default RestoreReportsListsPage;

RestoreReportsListsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_OPERATION_RESTORE_REPORTS}>
      {page}
    </Layout>
  );
};
