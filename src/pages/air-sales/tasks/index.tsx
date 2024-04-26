import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Tasks from '@/modules/airSales/Tasks';
function AirSaleTaskPage() {
  return <Tasks />;
}
export default AirSaleTaskPage;
AirSaleTaskPage.getLayout = function getLayout(page: any) {
  return <Layout permissions={Permissions?.AIR_SALES_TASKS}>{page}</Layout>;
};
