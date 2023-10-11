import Layout from '@/layout';

import AddPlan from '@/modules/superAdmin/PlanManagement/AddPlan';

const AddPlanPage = () => {
  return <AddPlan />;
};

export default AddPlanPage;

AddPlanPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
