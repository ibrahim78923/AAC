import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';

function SuperAdminPage() {
  return <div>Dashboard Page</div>;
}
export default SuperAdminPage;
SuperAdminPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
