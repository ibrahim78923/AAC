import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Dashboard from '@/modules/airSales/Dashboard';

const SalesDashboardPage = () => {
  return <Dashboard />;
};
export default SalesDashboardPage;
SalesDashboardPage.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions.AIR_SALES_DASHBOARD}>
      {page}
    </Layout>
  );
};
