import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import CategoryForecastReports from '@/modules/airSales/Reports/CategoryForecastReports';

const ReportPage = () => {
  return <CategoryForecastReports />;
};
export default ReportPage;
ReportPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SALES_FORECAST_REPORTS}>
      {page}
    </Layout>
  );
};
