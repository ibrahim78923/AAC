import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';

import PlanManagement from '@/modules/superAdmin/PlanManagement';

const SuperAdminPlanManagementPage = () => {
  return <PlanManagement />;
};

export default SuperAdminPlanManagementPage;

SuperAdminPlanManagementPage.getLayout = function getLayout(page: any) {
  return <Layout permissions={Permissions.PLAN_MANAGEMENT}>{page}</Layout>;
};
