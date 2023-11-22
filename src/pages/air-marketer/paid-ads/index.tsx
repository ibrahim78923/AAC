import Layout from '@/layout';
import PaidAds from '@/modules/airMarketer/PaidAds';
const PaidAdsPage = () => <PaidAds />;

export default PaidAdsPage;

PaidAdsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
