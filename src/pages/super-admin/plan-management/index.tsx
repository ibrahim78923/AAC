import Layout from '@/layout';

const PlanManagementPage = () => {
  return <div>Plan Management Page</div>;
};
export default PlanManagementPage;
PlanManagementPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
