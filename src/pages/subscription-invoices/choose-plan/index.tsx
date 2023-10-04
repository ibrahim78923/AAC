import Layout from '@/layout';
import ChoosePlan from '@/modules/ChoosePlan';

const ChoosePlanPage = () => {
  return <ChoosePlan />;
};

export default ChoosePlanPage;
ChoosePlanPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
