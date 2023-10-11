import Layout from '@/layout';
import { SingleSoftwareDetail } from '@/modules/airServices/Assets/Software/SingleSoftwareDetail';
const SingleSoftwareDetailPage = () => {
  return <SingleSoftwareDetail />;
};

SingleSoftwareDetailPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default SingleSoftwareDetailPage;
