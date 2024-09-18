import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { RestoreReportsLists } from '@/modules/airOperations/Reports/RestoreReportsLists';

const ServicesReportsRestorePage = () => {
  return <RestoreReportsLists />;
};

export default ServicesReportsRestorePage;

ServicesReportsRestorePage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_OPERATION_RESTORE_REPORTS_SERVICES}>
      {page}
    </Layout>
  );
};
