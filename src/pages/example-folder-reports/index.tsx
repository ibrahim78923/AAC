import MainLayout from '@/layouts/SuperAdminLayout/mainLayout';
import ExampleFolderReports from '@/modules/ExampleFolderReports';

function ExampleFolderReportsPage() {
  return <ExampleFolderReports />;
}
export default ExampleFolderReportsPage;
ExampleFolderReportsPage.getLayout = function getLayout(page: any) {
  return <MainLayout>{page}</MainLayout>;
};
