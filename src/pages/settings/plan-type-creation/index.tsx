import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import PlanTypeCreation from '@/modules/settings/PlanTypeCreation';
function PlanTypeCreationPage() {
  return <PlanTypeCreation />;
}
export default PlanTypeCreationPage;
PlanTypeCreationPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
