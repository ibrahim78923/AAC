import Layout from '@/layout';
import Restore from '@/modules/airSales/Deals/Restore';
import { Permissions } from '@/constants/permissions';

const RestoreTablePage = () => {
  return (
    <Layout guardRoute permissions={Permissions?.AIR_SALES_DEALS}>
      <Restore />
    </Layout>
  );
};

export default RestoreTablePage;
