import Layout from '@/layout';
import PlanTypeCreation from '@/modules/superAdmin/settings/PlanTypeCreation';
const PlanTypeCreationPage = () => {
  return <PlanTypeCreation />;
};
export default PlanTypeCreationPage;
PlanTypeCreationPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
