import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import DealsReport from '@/modules/airSales/Reports/DealsReport';

const ReportPage = () => {
  return <DealsReport />;
};
export default ReportPage;
ReportPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SALES_DEALS_REPORTS}>{page}</Layout>
  );
};
