import Layout from '@/layout';
import EngagementAds from '@/modules/airMarketer/PaidAds/CreateAd/EngagementAds';

const EngagementAdsPage = () => {
  return <EngagementAds />;
};

export default EngagementAdsPage;

EngagementAdsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
