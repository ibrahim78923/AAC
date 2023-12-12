import Layout from '@/layout';
import AllView from '@/modules/airMarketer/Campaigns/AllView';

const AllViewPage = () => {
  return <AllView />;
};
export default AllViewPage;
AllViewPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
