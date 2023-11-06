import Layout from '@/layout';
import { SingleInventoryDetail } from '@/modules/airServices/Assets/Inventory/SingleInventoryDetail';
const SingleInventoryDetailPage = () => {
  return <SingleInventoryDetail />;
};

SingleInventoryDetailPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default SingleInventoryDetailPage;
