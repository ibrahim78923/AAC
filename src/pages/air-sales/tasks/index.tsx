import Layout from '@/layout';
import Tasks from '@/modules/airSales/Tasks';
function AirSaleTaskPage() {
  return <Tasks />;
}
export default AirSaleTaskPage;
AirSaleTaskPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
