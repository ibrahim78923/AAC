import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';

function PlanManagementPage() {
  return <div>Plan Management Page</div>;
}
export default PlanManagementPage;
PlanManagementPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
