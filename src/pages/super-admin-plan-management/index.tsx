// import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import PlanManagementModule from '@/modules/PlanManagement';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';

function PlanManagementPage() {
  return <PlanManagementModule />;
}
export default PlanManagementPage;
PlanManagementPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
