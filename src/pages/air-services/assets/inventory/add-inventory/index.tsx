import Layout from '@/layout';
import AddInventory from '@/modules/airServices/Assets/Inventory/AddInventory';
const AddInventoryPage = () => {
  return <AddInventory />;
};

AddInventoryPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default AddInventoryPage;
