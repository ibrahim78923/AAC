import Layout from '@/layout';
import TempStepper from '@/modules/airMarketer/PaidAds/TempStepper';

const TempStepPage = () => {
  return <TempStepper />;
};

export default TempStepPage;

TempStepPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
