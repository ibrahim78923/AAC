import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import Jobs from '@/modules/settings/Jobs';

function JobsPage() {
  return <Jobs />;
}
export default JobsPage;
JobsPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
