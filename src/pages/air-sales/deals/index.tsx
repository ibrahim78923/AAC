import Deals from '@/modules/airSales/Deals';
import Layout from '@/layout';

const DealsPage = () => {
  return <Deals />;
};

export default DealsPage;

DealsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
