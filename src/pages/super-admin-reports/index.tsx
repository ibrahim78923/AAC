import SuperAdminLayout from '@/layouts/SuperAdminLayout';

function SuperAdminReportsPage() {
  return <div>Reports Page</div>;
}
export default SuperAdminReportsPage;
SuperAdminReportsPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
