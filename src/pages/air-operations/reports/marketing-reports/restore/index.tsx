import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { MarketingReportsRestore } from '@/modules/airOperations/Reports/MarketingReports/MarketingReportsRestore';

const MarketingReportsRestorePage = () => {
  return <MarketingReportsRestore />;
};

export default MarketingReportsRestorePage;

MarketingReportsRestorePage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_OPERATION_RESTORE_REPORTS_MARKETING}>
      {page}
    </Layout>
  );
};
