import Deals from '@/modules/airSales/Deals';
import Layout from '@/layout';
import { Permissions } from '@/constants/permissions';

const DealsPage = () => {
  return <Deals />;
};

export default DealsPage;

DealsPage.getLayout = function getLayout(page: any) {
  return <Layout permissions={Permissions?.AIR_SALES_DEALS}>{page}</Layout>;
};
