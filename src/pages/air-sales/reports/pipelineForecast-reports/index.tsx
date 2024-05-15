import Layout from '@/layout';
import PipelineForecastReports from '@/modules/airSales/Reports/PipelineForecastReports';

const ReportPage = () => {
  return <PipelineForecastReports />;
};
export default ReportPage;
ReportPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
