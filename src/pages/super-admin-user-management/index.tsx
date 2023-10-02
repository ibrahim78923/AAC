import SuperAdminLayout from '@/layouts/SuperAdminLayout';

function UserManagementPage() {
  return <div>User Management Page</div>;
}
export default UserManagementPage;
UserManagementPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
