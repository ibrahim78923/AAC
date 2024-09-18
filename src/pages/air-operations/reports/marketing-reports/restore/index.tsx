import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { RestoreReportsLists } from '@/modules/airOperations/Reports/RestoreReportsLists';

const MarketingReportsRestorePage = () => {
  return <RestoreReportsLists />;
};

export default MarketingReportsRestorePage;

MarketingReportsRestorePage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_OPERATION_RESTORE_REPORTS_MARKETING}>
      {page}
    </Layout>
  );
};
