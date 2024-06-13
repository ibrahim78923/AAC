import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { UpsertMarketingReports } from '@/modules/airOperations/Reports/MarketingReports/UpsertMarketingReports';

const UpsertMarketingReportsPage = () => {
  return <UpsertMarketingReports />;
};

export default UpsertMarketingReportsPage;

UpsertMarketingReportsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_OPERATIONS_WORKFLOWS}>{page}</Layout>
  );
};
