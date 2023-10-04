import Layout from '@/layout';
import ManagePlan from '@/modules/ManagePlan';

const ManagePlanPage = () => {
  return <ManagePlan />;
};

export default ManagePlanPage;
ManagePlanPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
