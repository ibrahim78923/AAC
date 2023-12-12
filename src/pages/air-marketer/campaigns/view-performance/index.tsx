import Layout from '@/layout';
import ViewPerformance from '@/modules/airMarketer/Campaigns/ViewPerformance';

const CompaignsPage = () => {
  return <ViewPerformance />;
};
export default CompaignsPage;
CompaignsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
