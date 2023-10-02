import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import Meeting from '@/modules/Meetings';

function SuperAdminPage() {
  return (
    <div>
      <Meeting />
    </div>
  );
}
export default SuperAdminPage;
SuperAdminPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
