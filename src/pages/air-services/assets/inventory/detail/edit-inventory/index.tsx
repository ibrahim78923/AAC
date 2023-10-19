import Layout from '@/layout';
import EditInventory from '@/modules/airServices/Assets/Inventory/SingleInventoryDetail/Actions/EditInventory';
const EditInventoryPage = () => {
  return <EditInventory />;
};

EditInventoryPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default EditInventoryPage;
