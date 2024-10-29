import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import ViewPerformance from '@/modules/airMarketer/Campaigns/ViewPerformance';

const CompaignsPage = () => {
  return <ViewPerformance />;
};
export default CompaignsPage;
CompaignsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      guardRoute
      permissions={Permissions.AIR_MARKETER_CAMPAIGNS_PERMISSIONS}
    >
      {page}
    </Layout>
  );
};
