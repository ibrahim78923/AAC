import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Reports from '@/modules/airSales/Reports';

const ReportPage = () => {
  return <Reports />;
};
export default ReportPage;
ReportPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SALES_DEALS_REPORTS ||
        Permissions?.AIR_SALES_FORECAST_REPORTS
      }
    >
      {page}
    </Layout>
  );
};
