import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { MarketingReports } from '@/modules/airOperations/Reports/MarketingReports';

const MarketingReportsPage = () => {
  return <MarketingReports />;
};

export default MarketingReportsPage;

MarketingReportsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_OPERATIONS_WORKFLOWS}>{page}</Layout>
  );
};
