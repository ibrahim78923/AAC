import Layout from '@/layout';
import EngagementAdsStepper from '@/modules/airMarketer/PaidAds/CreateAd/EngagementAdsStepper';

const EngagementAdsPage = () => {
  return <EngagementAdsStepper />;
};

export default EngagementAdsPage;

EngagementAdsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
