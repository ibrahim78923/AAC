import Layout from '@/layout';
import ViewPerforance from '../../../../modules/airMarketer/Compaigns/ViewPerformance';

const CompaignsPage = () => {
  return <ViewPerforance />;
};
export default CompaignsPage;
CompaignsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
