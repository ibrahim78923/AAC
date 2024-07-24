import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import CreateDashboard from '@/modules/airSales/Dashboard/CreateDashboard';

const CreateDashboardPage = () => {
  return <CreateDashboard />;
};
export default CreateDashboardPage;
CreateDashboardPage.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions?.AIR_SALES_DASHBOARD}>
      {page}
    </Layout>
  );
};
