import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import ExampleFolderReports from '@/modules/ExampleFolderReports';

function ExampleFolderReportsPage() {
  return <ExampleFolderReports />;
}
export default ExampleFolderReportsPage;
ExampleFolderReportsPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
