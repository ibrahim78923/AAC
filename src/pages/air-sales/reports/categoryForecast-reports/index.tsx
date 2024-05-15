import Layout from '@/layout';
import CategoryForecastReports from '@/modules/airSales/Reports/CategoryForecastReports';

const ReportPage = () => {
  return <CategoryForecastReports />;
};
export default ReportPage;
ReportPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
