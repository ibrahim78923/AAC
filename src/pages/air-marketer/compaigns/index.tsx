import Layout from '@/layout';
import Compaigns from '@/modules/airMarketer/Compaigns';

const CompaignsPage = () => {
  return <Compaigns />;
};
export default CompaignsPage;
CompaignsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
