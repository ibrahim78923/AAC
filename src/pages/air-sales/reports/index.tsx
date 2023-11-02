import Layout from '@/layout';
import Reports from '@/modules/airSales/Reports';

const ReportPage = () => {
  return <Reports />;
};
export default ReportPage;
ReportPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
