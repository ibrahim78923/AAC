import Layout from '@/layout';

import PlanManagement from '@/modules/superAdmin/PlanManagement/ABC';

const SuperAdminPlanManagementPage = () => {
  return <PlanManagement />;
};

export default SuperAdminPlanManagementPage;

SuperAdminPlanManagementPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
