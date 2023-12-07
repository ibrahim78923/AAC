import Layout from '@/layout';
import CreateAd from '@/modules/airMarketer/PaidAds/CreateAd';

const CreateAdPage = () => {
  return <CreateAd />;
};

export default CreateAdPage;

CreateAdPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
