import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import CreateSalesDashboard from '@/modules/airSales/Dashboard/CreateSalesDashboard';

const CreateDashboardPage = () => {
  return <CreateSalesDashboard />;
};
export default CreateDashboardPage;
CreateDashboardPage.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions?.AIR_SALES_DASHBOARD}>
      {page}
    </Layout>
  );
};
