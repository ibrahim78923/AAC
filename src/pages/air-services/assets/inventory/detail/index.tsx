import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { SingleInventoryDetail } from '@/modules/airServices/Assets/Inventory/SingleInventoryDetail';
const SingleInventoryDetailPage = () => {
  return <SingleInventoryDetail />;
};

SingleInventoryDetailPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_ASSETS_INVENTORY_DETAIL}>
      {page}
    </Layout>
  );
};

export default SingleInventoryDetailPage;
