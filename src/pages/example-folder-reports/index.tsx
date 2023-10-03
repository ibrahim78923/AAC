import Layout from '@/layout';
import ExampleFolderReports from '@/modules/ExampleFolderReports';

function ExampleFolderReportsPage() {
  return <ExampleFolderReports />;
}
export default ExampleFolderReportsPage;
ExampleFolderReportsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
