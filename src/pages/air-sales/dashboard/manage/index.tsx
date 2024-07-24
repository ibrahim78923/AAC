import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Manage from '@/modules/airSales/Dashboard/Manage';

const ManageDashboard = () => {
  return <Manage />;
};
export default ManageDashboard;
ManageDashboard.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions?.AIR_SALES_DASHBOARD}>
      {page}
    </Layout>
  );
};
